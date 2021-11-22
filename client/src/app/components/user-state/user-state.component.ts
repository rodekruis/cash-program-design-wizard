import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-state',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.scss'],
})
export class UserStateComponent implements OnInit, OnDestroy {
  public userName: string;

  public isLoggedIn: boolean;

  private authStateUpdates: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authStateUpdates = this.authService.authenticationState$.subscribe(
      (user: User | null) => {
        this.isLoggedIn = !!user && !!user.userName;
        this.userName = user && user.userName ? user.userName : '';
      },
    );
  }

  ngOnDestroy() {
    this.authStateUpdates.unsubscribe();
  }

  public doLogout() {
    this.authService.logout();
  }
}
