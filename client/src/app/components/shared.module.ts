import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components/header/header.component';
import { FiltersComponent } from './filters/filters.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavProgressComponent } from './nav-progress/nav-progress.component';
import { ProgramPhaseComponent } from './program-phase/program-phase.component';
import { QuestionSectionComponent } from './question-section/question-section.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UserStateComponent } from './user-state/user-state.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    TranslateModule,
  ],
  declarations: [
    HeaderComponent,
    LoginFormComponent,
    ProgramPhaseComponent,
    QuestionSectionComponent,
    SidebarComponent,
    UserStateComponent,
    NavProgressComponent,
    FiltersComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonicModule,
    LoginFormComponent,
    ProgramPhaseComponent,
    QuestionSectionComponent,
    RouterModule,
    SidebarComponent,
    TranslateModule,
    UserStateComponent,
    NavProgressComponent,
    FiltersComponent,
  ],
})
export class SharedModule {}
