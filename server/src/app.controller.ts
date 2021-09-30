import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TranslatableString } from './types/translatable-string.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): TranslatableString {
    return this.appService.getHello();
  }
}
