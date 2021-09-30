import { Injectable } from '@nestjs/common';
import { TranslatableString } from './types/translatable-string.type';

@Injectable()
export class AppService {
  getHello(): TranslatableString {
    return { en: 'Hello World!', nl: 'Hallo Wereld!' };
  }
}
