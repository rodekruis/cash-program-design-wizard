import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramPage } from './program.page';

const routes: Routes = [
  {
    path: ':id',
    component: ProgramPage,
  },
  {
    path: '**',
    component: ProgramPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramPageRoutingModule {}
