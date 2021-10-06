import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiPath, ApiService } from '../services/api.service';
import { StateService } from '../services/state.service';
import { TranslatableStringService } from '../services/translatable-string.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public apiTestInProgress = false;

  constructor(
    public state: StateService,
    private apiService: ApiService,
    private translatableString: TranslatableStringService,
    public translate: TranslateService,
  ) {}

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
