import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule.forChild(),
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
