import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public today = new Date().toDateString().toUpperCase().split(' ');
  public todayTop = `${this.today[0]} ${this.today[2]}`;
  public todayBottom = `${this.today[1]} ${this.today[3]}`;

  constructor(public translate: TranslateService) {}

  ngOnInit() {}
}
