import { Component, Input } from '@angular/core';
import { QuestionType } from 'src/app/types/question-input.type';
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
}
