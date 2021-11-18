import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserRole } from '../models/user.model';
import { ApiPath, ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string;
  public authenticationState$: Observable<User | null>;

  private authenticationState = new BehaviorSubject<User | null>(null);

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router,
  ) {
    this.authenticationState$ = this.authenticationState.asObservable();

    this.checkAuthenticationState();
  }

  public isLoggedIn(): boolean {
    return this.getUserFromToken() !== null;
  }

  public hasUserRole(requiredRoles: UserRole[], programId: string): boolean {
    const user = this.getUserFromToken();

    if (!user || !user.roles) {
      return false;
    }

    if (environment.debug && programId === '123') {
      console.warn('Using mock-user role, based on username!');
      return requiredRoles.some((role) => user.userName.startsWith(role));
    }

    return requiredRoles.some(
      (role) => user.roles[programId] && user.roles[programId] === role,
    );
  }

  public async login(userName: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService
        .post(ApiPath.login, {
          userName,
          password,
        })
        .subscribe(
          (response) => {
            let user: User | null;

            if (response.user && response.user.token) {
              this.jwtService.saveToken(response.user.token);
              user = this.getUserFromToken();
              this.authenticationState.next(user);
            }

            if (!user) {
              return reject({ status: 401 });
            }

            if (this.redirectUrl) {
              this.router.navigate([this.redirectUrl]);
              this.redirectUrl = null;
            } else {
              this.router.navigate(['/program']);
            }
            return resolve('');
          },
          (error) => {
            console.error('AuthService: login error: ', error);
            return reject(error);
          },
        );
    });
  }

  public logout() {
    this.jwtService.destroyToken();
    this.authenticationState.next(null);
    this.router.navigate(['/login']);
  }

  private checkAuthenticationState() {
    const user = this.getUserFromToken();

    this.authenticationState.next(user);
  }

  private getUserFromToken(): User | null {
    const rawToken = this.jwtService.getToken();

    if (!rawToken) {
      return null;
    }

    let user: User;

    try {
      user = this.jwtService.decodeToken(rawToken);
    } catch {
      console.warn('AuthService: Invalid token');
      return null;
    }

    if (!user || !user.userName) {
      console.warn('AuthService: No valid user');
      return null;
    }

    return {
      id: user.id,
      userName: user.userName,
      roles: user.roles,
    };
  }
}
