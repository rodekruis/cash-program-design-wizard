import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, retry, share, timeout } from 'rxjs/operators';
import { SyncTask } from '../types/sync-task.type';
import { ApiPath, ApiService } from './api.service';

const HTTP_TIMEOUT_IN_MS = 5000;
const REQUEST_RETRIES = 2;
const STORAGE_KEY = 'syncTasks';

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  constructor(private apiService: ApiService) {}

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
    return (
      err instanceof TimeoutError ||
      err.error instanceof ErrorEvent ||
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
