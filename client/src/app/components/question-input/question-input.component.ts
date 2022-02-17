import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { getOptionChoiceAnswer } from 'src/app/helpers/answers.helpers';
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
  public questionNr: string;

  @Input()
  public canEdit = false;

  public isHighlighted: boolean;
  public questionTypes = QuestionType;
  public tagLabels: { [tag: string]: string };
  public getOptionChoiceAnswer = getOptionChoiceAnswer;

  private routeUpdates: Subscription;
  private highlightTimer: number;

  constructor(
    private translate: TranslateService,
    private state: StateService,
    private programData: ProgramDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.tagLabels = this.translate.instant('filters.tags');

    this.routeUpdates = this.route.fragment.subscribe((fragment) => {
      if (this.question && this.question.name === fragment) {
        // Using a 'magic' timeout, for lack of a better "done rendering"-event
        this.highlightTimer = window.setTimeout(() => {
          this.highlight();
        }, 1000);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeUpdates) {
      this.routeUpdates.unsubscribe();
      window.clearTimeout(this.highlightTimer);
    }
  }

  public onChangeAnswer(question: QuestionInput) {
    this.programData.saveAnswer(this.state.programId, question);
  }

  public highlight() {
    this.isHighlighted = true;
    const containerElement: HTMLElement = document.querySelector(
      `#${this.question.name}`,
    );
    if (!containerElement) {
      return;
    }
    containerElement.scrollIntoView({ block: 'center' });
    containerElement.focus();
  }
}
