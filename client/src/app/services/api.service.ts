import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private jwtService: JwtService, private http: HttpClient) {}

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
      );
  }

  public post(path: ApiPath, body: any, _params?: HttpParams): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/${path}`, body, {
        headers: this.createHeaders(),
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

  private createHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Accept: 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    });
    const token = this.jwtService.getToken();

    return headers.set('Authorization', `Token ${token}`);
  }
}
