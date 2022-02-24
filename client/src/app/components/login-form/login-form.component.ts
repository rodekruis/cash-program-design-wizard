import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @ViewChild('loginForm')
  public loginForm: NgForm;

  public model = {
    email: '',
    password: '',
  };

  public inProgress = false;
  public logInError = false;
  public statusText: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  public onSubmit() {
    if (!this.model.email || !this.model.password) {
      return;
    }

    this.inProgress = true;
    this.logInError = false;

    this.authService.login(this.model.email, this.model.password).then(
      () => {
        console.log('Login success.');
        this.inProgress = false;
        this.logInError = false;
      },
      (error) => {
        console.log('Login fail.', error);
        this.inProgress = false;
        this.logInError = true;
        this.statusText = error.statusText;
      },
    );
  }
}
