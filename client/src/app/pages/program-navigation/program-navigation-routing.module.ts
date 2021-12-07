import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramNavigationPage } from './program-navigation.page';

const routes: Routes = [
  {
    path: '**',
    component: ProgramNavigationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgramNavigationPageRoutingModule {}
