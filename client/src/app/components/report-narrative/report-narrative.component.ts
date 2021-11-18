import {
  Component,
  ElementRef,
  OnInit,
  SecurityContext,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Clipboard } from '@capacitor/clipboard';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownService } from 'ngx-markdown';
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
  answerUpdated: string | Date;
  question: QuestionInput;
};

@Component({
  selector: 'app-report-narrative',
  templateUrl: './report-narrative.component.html',
  styleUrls: ['./report-narrative.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportNarrativeComponent implements OnInit {
  @ViewChild('reportOutput')
  public reportOutput: ElementRef;

  public rawReport: string;
  public report: string;

  public lastUpdate: string | Date;

  private reportTemplate: string;
  private answers: AnswerSet[];

  private missingExplanation: string;
  private answerPrefix: string;

  constructor(
    private state: StateService,
    private translate: TranslateService,
    private markdownService: MarkdownService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    // All these operations will not run/finish in order, so each tries to render the template
    this.translate
      .get('report-narrative.missing-explanation')
      .subscribe((label) => {
        this.missingExplanation = label;
        this.renderTemplate();
      });
    this.translate.get('report-narrative.answer-prefix').subscribe((label) => {
      this.answerPrefix = label;
      this.renderTemplate();
    });
    this.state.programMetaData$.subscribe((program) => {
      this.reportTemplate = program.narrativeReportTemplate;
      this.renderTemplate();
    });
    this.state.sections$.subscribe((sections) => {
      if (!sections.length) {
        return;
      }
      this.answers = this.createAnswersSet(sections);
      this.lastUpdate = this.findLatestAnswer();
      this.renderTemplate();
    });
  }

  public print() {
    window.print();
  }

  public async copy2Clipboard(source: string) {
    const reportText = this.stripHtml(source);
    await Clipboard.write({
      // eslint-disable-next-line id-blacklist
      string: reportText,
    });
  }

  private stripHtml(source: string): string {
    const output = document.createElement('output');
    output.innerHTML = source;
    return output.innerText || '';
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
        answerUpdated: question.answerUpdated,
        question,
      }));
    return answers;
  }

  private renderTemplate() {
    // Only continue if everything is available
    if (
      !this.reportTemplate ||
      !this.answers ||
      !this.missingExplanation ||
      !this.answerPrefix
    ) {
      return;
    }

    this.rawReport = this.parseTemplate(this.reportTemplate);
    const markedReport = this.markdownService.compile(this.rawReport);
    this.report = this.domSanitizer.sanitize(
      SecurityContext.HTML,
      markedReport,
    );
  }

  private parseTemplate(template: string) {
    return template.replace(/{{([^{]+)}}/gi, (_token, variable) => {
      const answer = this.getAnswerByName(variable);

      if (!answer || !answer.length) {
        return `<em class="variable variable--empty" title="${this.missingExplanation}"> <code>${variable}</code> </em>`;
      }

      if (Array.isArray(answer)) {
        const listOptions = answer.map(
          (option) =>
            `<li><strong class="variable variable--filled">${option}</strong></li>`,
        );
        return `<ul title="${this.answerPrefix} ${variable}">
          ${listOptions.join('')}
        </ul>`;
      }

      return `<strong class="variable variable--filled" title="${this.answerPrefix} ${variable}">${answer}</strong>`;
    });
  }

  private getAnswerByName(name: string): string | string[] {
    const answer = this.answers.find((a) => a.name === name);
    if (!answer) {
      return '';
    }

    if (
      answer.question.type === QuestionType.selectN &&
      Array.isArray(answer.answer)
    ) {
      const answerOptions = answer.answer.map((answerOption) =>
        getOptionChoiceAnswer(answer.question, answerOption),
      );
      return answerOptions;
    }

    if (answer.question.type === QuestionType.select1) {
      return getOptionChoiceAnswer(answer.question, answer.answer);
    }

    return answer.answer.toString();
  }

  private findLatestAnswer() {
    if (!this.answers.length) {
      return '';
    }
    // Sort latest first
    this.answers.sort((a, b) => (a.answerUpdated > b.answerUpdated ? -1 : 1));

    return this.answers[0].answerUpdated;
  }
}
