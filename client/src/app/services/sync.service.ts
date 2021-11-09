import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, EMPTY, Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, retry, share, timeout } from 'rxjs/operators';
import { SyncTask } from '../types/sync-task.type';
import { ApiPath, ApiService } from './api.service';

const HTTP_TIMEOUT_IN_MS = 5000;
const REQUEST_RETRIES = 2;
const STORAGE_KEY = 'syncTasks';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  constructor(private apiService: ApiService) {
    window.addEventListener('online', () => {
      console.log('Going back on-line, triggering processing Sync-queue...');
      this.sync();
    });
  }

  public sync(): Observable<any> {
    const requests: Observable<any>[] = [];
    const syncTasks = this.getExistingSyncTasks();

    syncTasks.forEach((task: SyncTask) => {
      const params = new HttpParams({
        fromString: task.params,
      });
      const request$ = this.apiService
        .post(task.url, task.body, params)
        .pipe(map((_) => task));

      requests.push(request$);
    });

    const allRequests$ = concat(...requests).pipe(share());

    allRequests$.subscribe((task) => {
      const index = syncTasks.findIndex((t) => t === task);
      syncTasks.splice(index, 1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(syncTasks));
    });

    return allRequests$;
  }

  public tryPost(
    url: ApiPath,
    body: any,
    params?: HttpParams,
  ): Observable<any> {
    return this.apiService.post(url, body, params).pipe(
      timeout(HTTP_TIMEOUT_IN_MS),
      retry(REQUEST_RETRIES),
      catchError((err: HttpErrorResponse) => {
        console.log('SyncService: tryPost Error:', err);
        return this.handleError(err, url, body, params);
      }),
      share(),
    );
  }

  private handleError(
    err: HttpErrorResponse,
    url: ApiPath,
    body: any,
    params?: HttpParams,
  ): Observable<any> {
    if (this.offlineOrBadConnection(err)) {
      // A front-end or network error occurred.
      this.addOrUpdateSyncTask(url, body, params);
      return EMPTY;
    } else {
      console.warn('SyncService: Back-end error:', err);
      // The back-end returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      return throwError(err);
    }
  }

  private offlineOrBadConnection(err: HttpErrorResponse): boolean {
    console.log('err instanceof TimeoutError: ', err instanceof TimeoutError);
    console.log(
      'err.error instanceof ErrorEvent: ',
      err.error instanceof ErrorEvent,
    );
    console.log('err.status === 0: ', err.status === 0);
    console.log('!window.navigator.onLine: ', !window.navigator.onLine);
    return (
      err instanceof TimeoutError ||
      err.error instanceof ErrorEvent ||
      err.status === 0 ||
      !window.navigator.onLine
    );
  }

  private addOrUpdateSyncTask(
    url: ApiPath,
    body: any,
    params?: HttpParams,
  ): void {
    const syncTask = new SyncTask(
      url,
      body,
      params ? params.toString() : undefined,
    );
    const tasks = this.getExistingSyncTasks();

    tasks.push(syncTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    console.log('SyncService: SyncTask added to queue.');
  }

  private getExistingSyncTasks(): SyncTask[] {
    const serializedTasks = localStorage.getItem(STORAGE_KEY);

    return serializedTasks ? JSON.parse(serializedTasks) : [];
  }
}
