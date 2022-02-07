import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferQuestionsPage } from './transfer-questions.page';

const routes: Routes = [
  {
    path: '**',
    component: TransferQuestionsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferQuestionsPageRoutingModule {}
