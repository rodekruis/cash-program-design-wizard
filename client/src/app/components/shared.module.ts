import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../components/header/header.component';
import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { FiltersComponent } from './filters/filters.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavProgressComponent } from './nav-progress/nav-progress.component';
import { ProgramPhaseComponent } from './program-phase/program-phase.component';
import { QuestionSectionComponent } from './question-section/question-section.component';
import { ReportNarrativeComponent } from './report-narrative/report-narrative.component';
import { ReportSectionComponent } from './report-section/report-section.component';
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
    FiltersComponent,
    HeaderComponent,
    LoginFormComponent,
    NavProgressComponent,
    ProgramPhaseComponent,
    QuestionSectionComponent,
    ReportNarrativeComponent,
    ReportSectionComponent,
    SidebarComponent,
    UserStateComponent,
    CommentInputComponent,
    CommentsListComponent,
  ],
  exports: [
    CommonModule,
    FiltersComponent,
    FormsModule,
    HeaderComponent,
    IonicModule,
    LoginFormComponent,
    NavProgressComponent,
    ProgramPhaseComponent,
    QuestionSectionComponent,
    ReportNarrativeComponent,
    ReportSectionComponent,
    RouterModule,
    SidebarComponent,
    TranslateModule,
    UserStateComponent,
    CommentInputComponent,
    CommentsListComponent,
  ],
})
export class SharedModule {}
