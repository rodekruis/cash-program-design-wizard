import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiPath, ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { StateService } from '../services/state.service';
import { TranslatableStringService } from '../services/translatable-string.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    public state: StateService,
    private apiService: ApiService,
    private translatableString: TranslatableStringService,
    public translate: TranslateService,
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  public changeLanguage(event: any) {
    const locale = event.detail.value;
    console.log(`Set language/locale to: ${locale}`);
    this.translate.use(locale);
  }

  public apiTestGet() {
    this.apiService.get(ApiPath.test).subscribe((response) => {
      window.alert(this.translatableString.get(response));
    });
  }

  public apiFakeLogIn() {
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJpZCI6MiwidXNlcm5hbWUiOiJ1c2VyMkBleGFtcGxlLm9yZyIsImV4cCI6MTYzODE4OTA1NC43MjgsImlhdCI6MTYzMzAwMTQ1NH0.' +
      'WnZV5VdrU3MMh_PW2W0YM5nLbC-DaGa7E4sKsWXIZSg';
    const input = window.prompt('Token?', fakeToken);

    if (!input) {
      return;
    }
    this.jwtService.saveToken(input);
  }

  public apiFakeLogOut() {
    this.authService.logout();
  }
}
