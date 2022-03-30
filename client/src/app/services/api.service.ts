import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

export enum ApiPath {
  test = '',
  login = 'users/login',
  userPrograms = 'programs',
  programs = 'programs',
  answers = 'answers',
  comments = 'comments',
  scriptsExport = 'scripts/export',
  scriptsImport = 'scripts/import',
  scriptsDeleteQuestion = 'scripts/questions/delete',
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private jwtService: JwtService,
    private http: HttpClient,
    private router: Router,
  ) {}

  public get(
    path: ApiPath | string,
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
        catchError((error) => {
          if (error.error && error.error.statusCode === 401) {
            this.router.navigate(['/login']);
          }
          return of(error);
        }),
      );
  }

  public post(
    path: ApiPath,
    body: any,
    _params?: HttpParams,
    isUpload?: boolean,
  ): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/${path}`, body, {
        headers: this.createHeaders(isUpload),
      })
      .pipe(
        tap((response) => {
          if (body.password) {
            body.password = '********';
          }
          console.log(
            `ApiService POST: ${path}:`,
            body,
            `\nResponse:`,
            response,
          );
        }),
      );
  }

  private createHeaders(isUpload = false): HttpHeaders {
    let headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    });

    if (isUpload) {
      headers = headers.delete('Content-Type');
    }

    const token = this.jwtService.getToken();

    return headers.set('Authorization', `Token ${token}`);
  }
}
