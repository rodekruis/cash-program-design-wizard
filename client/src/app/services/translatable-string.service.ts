import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableString } from '../types/translatable-string.type';

@Injectable({
  providedIn: 'root',
})
export class TranslatableStringService {
  private fallbackLanguageCode: string;

  constructor(private translate: TranslateService) {
    this.fallbackLanguageCode = this.translate.getDefaultLang();
  }

  public get(property: TranslatableString | string): string {
    if (!property) {
      return '';
    }

    if (typeof property !== 'object') {
      return property;
    }

    let label: any = property[this.translate.currentLang];

    if (typeof label === 'undefined') {
      label = property[this.fallbackLanguageCode];
    }

    if (typeof label === 'undefined') {
      label = property;
    }

    return label;
  }
}
