import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  flatten,
  getOptionChoiceAnswer,
} from 'src/app/pages/report/report-helpers';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput, QuestionType } from 'src/app/types/question-input.type';
import {
  QuestionSection,
  QuestionSubsection,
} from 'src/app/types/question-section.type';

type AnswerSet = {
  name: string;
  answer: string | string[];
  question: QuestionInput;
};

@Component({
  selector: 'app-report-narrative',
  templateUrl: './report-narrative.component.html',
  styleUrls: ['./report-narrative.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ReportNarrativeComponent implements OnInit {
  public report: string;

  private answers: AnswerSet[];

  constructor(
    private state: StateService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.state.sections$.subscribe((sections) => {
      this.answers = this.createAnswersSet(sections);

      if (!this.state.narrativeReportTemplate || !this.answers) {
        return;
      }

      this.report = this.parseTemplate(
        this.state.narrativeReportTemplate,
        this.answers,
      );
    });
  }

  private createAnswersSet(sections: QuestionSection[]): AnswerSet[] {
    const subsections = flatten(
      sections.map((section) => section.subsections),
    ) as QuestionSubsection[];
    const questions = flatten(
      subsections.map((subsection) => subsection.questions),
    ) as QuestionInput[];
    const answers = questions
      .filter((question) => !!question.answer)
      .map((question) => ({
        name: question.name,
        answer: question.answer,
        question,
      }));
    return answers;
  }

  private parseTemplate(template: string, answers: AnswerSet[]) {
    const missingExplanation = this.translate.instant(
      'report-narrative.missing-explanation',
    );
    const answerPrefix = this.translate.instant(
      'report-narrative.answer-prefix',
    );
    return template.replace(/{{([^{]+)}}/gi, (_token, variable) => {
      const answer = this.getAnswerByName(variable);

      if (!answer) {
        return `<em class="variable variable--empty" title="${missingExplanation}"> <code>${variable}</code> </em>`;
      }

      return `<strong class="variable variable--filled" title="${answerPrefix} ${variable}">${answer}</strong>`;
    });
  }

  private getAnswerByName(name: string): string {
    const answer = this.answers.find((a) => a.name === name);
    if (!answer) {
      return '';
    }

    if (
      answer.question.type === QuestionType.selectN &&
      typeof answer.answer === 'object'
    ) {
      const answerOptions = answer.answer.map((answerOption) =>
        getOptionChoiceAnswer(answer.question, answerOption),
      );
      return answerOptions.join(', ');
    }

    if (answer.question.type === QuestionType.select1) {
      return getOptionChoiceAnswer(answer.question, answer.answer);
    }

    return answer.answer.toString();
  }
}
