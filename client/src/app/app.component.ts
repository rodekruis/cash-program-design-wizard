import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    public notifications: NotificationService, // Injection required here to enable notifications triggered by PubSub-events
  ) {
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
