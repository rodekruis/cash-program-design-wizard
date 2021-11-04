import { Component, Input } from '@angular/core';
import { ProgramDataService } from 'src/app/services/program-data.service';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput, QuestionType } from 'src/app/types/question-input.type';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss'],
})
export class QuestionSectionComponent {
  @Input()
  section: QuestionSection;

  public questionTypes = QuestionType;

  constructor(
    private state: StateService,
    private programData: ProgramDataService,
  ) {}

  public onChangeAnswer(question: QuestionInput) {
    this.programData.saveAnswer(this.state.programId, question);
  }

  public showComments(question: QuestionInput): boolean {
    return (
      question.comment &&
      question.type !== QuestionType.select1 &&
      question.type !== QuestionType.selectN
    );
  }
}
