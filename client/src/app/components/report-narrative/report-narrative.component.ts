import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  SecurityContext,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Clipboard } from '@capacitor/clipboard';
import { TranslateService } from '@ngx-translate/core';
import { MarkdownService } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import {
  AnswerSet,
  createAnswersSet,
  getLatestAnswerDate,
  getOptionChoiceAnswer,
} from 'src/app/helpers/answers.helpers';
import { StateService } from 'src/app/services/state.service';
import { QuestionType } from 'src/app/types/question-input.type';

type QuestionSet = {
  name: string;
  sectionName: string;
};

@Component({
  selector: 'app-report-narrative',
  templateUrl: './report-narrative.component.html',
  styleUrls: ['./report-narrative.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReportNarrativeComponent implements OnInit, OnDestroy {
  @ViewChild('reportOutput', { static: true })
  public reportOutput: ElementRef;

  public rawReport: string;
  public report: string;

  public lastUpdate: string | Date;

  private reportTemplate: string;
  private answers: AnswerSet[];
  private allQuestionsWithSectionNames: QuestionSet[];

  private missingExplanation: string;
  private answerPrefix: string;
  private missingQuestionSuffix: string;

  private translation1Updates: Subscription;
  private translation2Updates: Subscription;
  private translation3Updates: Subscription;
  private programUpdates: Subscription;
  private sectionUpdates: Subscription;

  constructor(
    private state: StateService,
    private translate: TranslateService,
    private markdownService: MarkdownService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit() {
    // All these operations will not run/finish in order, so each tries to render the template
    this.translation1Updates = this.translate
      .get('report-narrative.missing-explanation')
      .subscribe((label) => {
        this.missingExplanation = label;
        this.renderTemplate();
      });
    this.translation2Updates = this.translate
      .get('report-narrative.answer-prefix')
      .subscribe((label) => {
        this.answerPrefix = label;
        this.renderTemplate();
      });
    this.translation3Updates = this.translate
      .get('report-narrative.missing-question-suffix')
      .subscribe((label) => {
        this.missingQuestionSuffix = label;
        this.renderTemplate();
      });
    this.programUpdates = this.state.programMetaData$.subscribe((program) => {
      this.reportTemplate = program.narrativeReportTemplate;
      this.renderTemplate();
    });
    this.sectionUpdates = this.state.sections$.subscribe((sections) => {
      if (!sections.length) {
        return;
      }
      this.allQuestionsWithSectionNames = this.createAllQuestionsSet(sections);
      this.answers = createAnswersSet(sections);
      this.lastUpdate = getLatestAnswerDate(this.answers);
      this.renderTemplate();
    });
  }

  ngOnDestroy() {
    this.translation1Updates.unsubscribe();
    this.translation2Updates.unsubscribe();
    this.translation3Updates.unsubscribe();
    this.programUpdates.unsubscribe();
    this.sectionUpdates.unsubscribe();
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

  private createAllQuestionsSet(sections: QuestionSection[]): QuestionSet[] {
    const subsections = flatten(
      sections.map((section) => section.subsections),
    ) as QuestionSubsection[];
    const questions = flatten(
      subsections.map((subsection) => subsection.questions),
    ) as QuestionInput[];
    const emptyAnswers = questions.map((question) => ({
      name: question.name,
      sectionName: question.sectionName,
    }));
    return emptyAnswers;
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

      const urlPrefix = `/program/${this.state.programId}/overview?section=`;

      if (!answer || !answer.length) {
        const question = this.allQuestionsWithSectionNames.find(
          (q) => q.name === variable,
        );

        const questionPlaceholder = (varType, suffix, toolTip) =>
          `<em class="variable variable--${varType}" title="${toolTip}"><code>${variable}</code>${suffix}</em>`;

        if (!question) {
          return questionPlaceholder('missing', this.missingQuestionSuffix, '');
        }
        return `<a href="${urlPrefix}${
          question.sectionName
        }">${questionPlaceholder('empty', '', this.missingExplanation)}</a>`;
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
}
