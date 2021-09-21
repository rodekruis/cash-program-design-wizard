import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components/header/header.component';
import { ProgramPhaseComponent } from './program-phase/program-phase.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule],
  declarations: [HeaderComponent, SidebarComponent, ProgramPhaseComponent],
  exports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    ProgramPhaseComponent,
  ],
})
export class SharedModule {}
