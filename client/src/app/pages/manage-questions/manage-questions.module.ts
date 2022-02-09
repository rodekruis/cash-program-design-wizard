import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/components/shared.module';
import { ManageQuestionsPageRoutingModule } from './manage-questions-routing.module';
import { ManageQuestionsPage } from './manage-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageQuestionsPageRoutingModule,
    SharedModule,
  ],
  declarations: [ManageQuestionsPage],
})
export class ManageQuestionsModule {}
