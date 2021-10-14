import { Component, Input } from '@angular/core';
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

  constructor() {}

  public showComments(question: QuestionInput): boolean {
    return (
      question.comment &&
      question.type !== QuestionType.select1 &&
      question.type !== QuestionType.selectN
    );
  }
}
