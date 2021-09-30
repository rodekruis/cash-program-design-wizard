import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export enum ApiPath {
  test = '',
  user = 'user',
  login = 'user/login',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  public get(
    path: ApiPath,
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        },
  ): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/${path}`, {
        headers: this.createHeaders(),
        params,
      })
      .pipe(
        tap((response) =>
          console.log(`ApiService GET: ${path}`, `\nResponse:`, response),
        ),
      );
  }

  public post(path: ApiPath, body: any): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/${path}`, body, {
        headers: this.createHeaders(),
      })
      .pipe(
        tap((response) =>
          console.log(
            `ApiService POST: ${path}:`,
            body,
            `\nResponse:`,
            response,
          ),
        ),
      );
  }

  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    });
    const token = 'test';

    return headers.set('Authorization', `Token ${token}`);
  }
}
