import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/components/shared.module';
import { TransferQuestionsPageRoutingModule } from './transfer-questions-routing.module';
import { TransferQuestionsPage } from './transfer-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferQuestionsPageRoutingModule,
    SharedModule,
  ],
  declarations: [TransferQuestionsPage],
})
export class TransferQuestionsModule {}
