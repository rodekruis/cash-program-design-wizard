import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/components/shared.module';
import { ProgramNavigationPageRoutingModule } from './program-navigation-routing.module';
import { ProgramNavigationPage } from './program-navigation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ProgramNavigationPageRoutingModule,
  ],
  declarations: [ProgramNavigationPage],
})
export class ProgramNavigationPageModule {}
