import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [HeaderComponent],
  exports: [CommonModule, IonicModule, TranslateModule, HeaderComponent],
})
export class SharedModule {}
