import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Tag } from 'src/app/models/tag.enum';
import { UserRole } from 'src/app/models/user.model';
import { getOptionChoiceAnswer } from 'src/app/pages/report/report-helpers';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramDataService } from 'src/app/services/program-data.service';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput, QuestionType } from 'src/app/types/question-input.type';
import {
  QuestionSection,
  QuestionSubsection,
} from 'src/app/types/question-section.type';

@Component({
  selector: 'app-question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss'],
})
export class QuestionSectionComponent {
  @Input()
  section: QuestionSection;

  public questionTypes = QuestionType;
  public tagLabels: { [tag: string]: string };

  public canEdit = false;
  public getOptionChoiceAnswer = getOptionChoiceAnswer;

  constructor(
    private state: StateService,
    private programData: ProgramDataService,
    private translate: TranslateService,
    private authService: AuthService,
  ) {
    this.tagLabels = this.translate.instant('filters.tags');

    // Use sections-update 'event' to get up-to-date Program-MetaData
    this.state.sections$.subscribe((_sections) => {
      this.canEdit = this.userCanEdit();
    });
  }

  public onChangeAnswer(question: QuestionInput) {
    this.programData.saveAnswer(this.state.programId, question);
  }

  public shouldShowQuestion(questionTags: QuestionInput['tags']): boolean {
    return (
      this.state.filters.tag === Tag.all ||
      questionTags.includes(this.state.filters.tag)
    );
  }

  public isSubSectionEmpty(subsection: QuestionSubsection): boolean {
    if (
      !subsection.questions ||
      (this.state.filters.tag !== Tag.all &&
        !subsection.questions.some((question) =>
          question.tags.includes(this.state.filters.tag),
        ))
    ) {
      return true;
    }

    return false;
  }

  public userCanEdit(): boolean {
    return this.authService.hasUserRole([UserRole.edit], this.state.programId);
  }

  public showComments(question: QuestionInput): boolean {
    return (
      question.type !== QuestionType.select1 &&
      question.type !== QuestionType.selectN
    );
  }
}
