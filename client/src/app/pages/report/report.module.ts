import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/components/shared.module';
import { ReportPageRoutingModule } from './report-routing.module';
import { ReportPage } from './report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReportPageRoutingModule,
  ],
  declarations: [ReportPage],
})
export class ReportPageModule {}
