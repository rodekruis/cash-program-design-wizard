import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { ApiPath, ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { TranslatableStringService } from '../services/translatable-string.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public isDebug = !environment.production || environment.useMockData;

  public apiTestInProgress = false;

  constructor(
    private apiService: ApiService,
    private translatableString: TranslatableStringService,
    public translate: TranslateService,
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.isDebug) {
      return;
    }
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/program']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public changeLanguage(event: any) {
    const locale = event.detail.value;
    console.log(`Set language/locale to: ${locale}`);
    this.translate.use(locale);
  }

  public apiTestGet() {
    this.apiTestInProgress = true;
    this.apiService.get(ApiPath.test).subscribe((response) => {
      this.apiTestInProgress = false;
      window.alert(this.translatableString.get(response));
    });
  }
}
