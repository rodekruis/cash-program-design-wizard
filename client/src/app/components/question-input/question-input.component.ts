import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getOptionChoiceAnswer } from 'src/app/pages/report/report-helpers';
import { ProgramDataService } from 'src/app/services/program-data.service';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput, QuestionType } from 'src/app/types/question-input.type';

@Component({
  selector: 'app-question-input',
  templateUrl: './question-input.component.html',
  styleUrls: ['./question-input.component.scss'],
})
export class QuestionInputComponent implements OnInit, OnDestroy {
  @Input()
  public question: QuestionInput;

  @Input()
  public canEdit = false;

  public questionTypes = QuestionType;
  public tagLabels: { [tag: string]: string };
  public getOptionChoiceAnswer = getOptionChoiceAnswer;

  constructor(
    private translate: TranslateService,
    private state: StateService,
    private programData: ProgramDataService,
  ) {}

  ngOnInit() {
    this.tagLabels = this.translate.instant('filters.tags');
  }

  ngOnDestroy() {}

  public onChangeAnswer(question: QuestionInput) {
    this.programData.saveAnswer(this.state.programId, question);
  }
}
