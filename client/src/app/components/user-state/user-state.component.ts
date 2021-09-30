import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-state',
  templateUrl: './user-state.component.html',
  styleUrls: ['./user-state.component.scss'],
})
export class UserStateComponent implements OnInit {
  public userName: string;

  public isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authenticationState$.subscribe((user: User | null) => {
      this.isLoggedIn = !!user && !!user.username;
      this.userName = user && user.username ? user.username : '';
    });
  }

  public doLogout() {
    this.authService.logout();
  }
}
