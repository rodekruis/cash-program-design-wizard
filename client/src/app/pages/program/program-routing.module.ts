import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramPage } from './program.page';

const routes: Routes = [
  {
    path: ':id/overview',
    component: ProgramPage,
  },
  {
    path: ':id',
    redirectTo: ':id/overview',
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
