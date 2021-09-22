import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockProgram } from '../mocks/program.mock';
import { Tag } from '../models/tag.enum';
import { ViewMode } from '../models/view-mode.enum';
import { QuestionSection } from '../types/question-section.type';
import { TranslatableString } from '../types/translatable-string.type';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public programId: string;

  public filters: {
    tag: Tag | '';
  } = {
    tag: '',
  };

  public viewMode: ViewMode = ViewMode.view;

  public activeSection: QuestionSection;

  private sections: QuestionSection[];

  constructor(private route: ActivatedRoute) {
    this.updateFilters();

    this.getSections();
    this.setActiveSection(this.getFirstPendingSection());
  }

  public goPrevSection() {
    const prevSectionIndex = this.sections.indexOf(this.activeSection) - 1;
    this.setActiveSection(this.sections[prevSectionIndex]);
  }
  public goNextSection() {
    const nextSectionIndex = this.sections.indexOf(this.activeSection) + 1;
    this.setActiveSection(this.sections[nextSectionIndex]);
  }

  private async updateFilters() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.tag && Tag[queryParams.tag]) {
        this.filters.tag = queryParams.tag;
      } else {
        this.filters.tag = '';
      }
    });
  }

  private getSections() {
    this.sections = mockProgram.sections;
  }

  private getFirstPendingSection(): QuestionSection {
    return this.sections.find((section) => section.state === 'pending');
  }

  private setActiveSection(section: QuestionSection) {
    section.label = this.getTranslationsOf(section.label);
    section.questions = section.questions.map((question) => {
      question.label = this.getTranslationsOf(question.label);
      return question;
    });
    this.activeSection = section;
  }

  private getTranslationsOf(inputObject: string | TranslatableString): string {
    if (typeof inputObject === 'string') {
      return inputObject;
    }
    return inputObject.en ? inputObject.en : '';
  }
}
