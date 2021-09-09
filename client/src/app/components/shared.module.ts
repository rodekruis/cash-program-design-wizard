import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components/header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [HeaderComponent, SidebarComponent],
  exports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
