import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getOptionChoiceAnswer } from 'src/app/pages/report/report-helpers';
import { QuestionType } from 'src/app/types/question-input.type';
import { QuestionSection } from 'src/app/types/question-section.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-section',
  templateUrl: './report-section.component.html',
  styleUrls: ['./report-section.component.scss'],
})
export class ReportSectionComponent {
  @Input()
  public section: QuestionSection;

  public programId: string;

  public questionType = QuestionType;

  public isDebug = environment.debug;

  public renderOptionChoiceAnswer = getOptionChoiceAnswer;

  constructor(private route: ActivatedRoute) {
    this.programId = this.route.snapshot.params.id;
  }
}
