import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    if (!!environment.envName) {
      document.title += ` [ ${environment.envName} ]`;
    }

    if (environment.autoDarkMode) {
      document.body.classList.add('dark');
    }

    // Update language + text-direction for the full interface
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      document.documentElement.lang = event.lang;
      document.documentElement.dir = this.translate.instant('_dir');
    });
  }
}
