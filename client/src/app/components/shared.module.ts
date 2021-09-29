import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components/header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProgramPhaseComponent } from './program-phase/program-phase.component';
import { QuestionSectionComponent } from './question-section/question-section.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule, RouterModule],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ProgramPhaseComponent,
    QuestionSectionComponent,
    LoginFormComponent,
  ],
  exports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    ProgramPhaseComponent,
    QuestionSectionComponent,
    LoginFormComponent,
  ],
})
export class SharedModule {}
