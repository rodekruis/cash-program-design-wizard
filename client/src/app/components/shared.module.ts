import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [HeaderComponent],
  exports: [CommonModule, IonicModule, HeaderComponent],
})
export class SharedModule {}
