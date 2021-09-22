import { Component, Input } from '@angular/core';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss'],
})
export class QuestionSectionComponent {
  @Input()
  section: QuestionSection;

  constructor() {}
}
