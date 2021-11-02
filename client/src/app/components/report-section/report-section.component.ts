import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionInput, QuestionType } from 'src/app/types/question-input.type';
import { QuestionSection } from 'src/app/types/question-section.type';
import { TranslatableString } from 'src/app/types/translatable-string.type';
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

  constructor(private route: ActivatedRoute) {
    this.programId = this.route.snapshot.params.id;
  }

  public renderOptionChoiceAnswer(
    question: QuestionInput,
    answer: string | string[],
  ): string | TranslatableString {
    const chosenOption = question.optionChoices.find(
      (option) => option.name === answer,
    );

    return chosenOption.label;
  }
}
