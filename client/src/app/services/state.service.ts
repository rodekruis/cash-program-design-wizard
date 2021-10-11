import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mockProgram } from '../mocks/program.mock';
import { Tag } from '../models/tag.enum';
import { ViewMode } from '../models/view-mode.enum';
import { QuestionSection } from '../types/question-section.type';
import { TranslatableStringService } from './translatable-string.service';

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

  public sections: QuestionSection[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translatableString: TranslatableStringService,
  ) {
    this.updateFilters();

    this.getSections();

    this.updateActiveSectionFromUrl();

    if (!this.activeSection) {
      this.setActiveSection(this.getFirstPendingSection());
    }
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

  private async updateActiveSectionFromUrl() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.section) {
        this.setActiveSection(this.getSectionBySlug(queryParams.section));
      }
    });
  }

  private getSections() {
    this.sections = mockProgram.sections;
  }

  private getSectionBySlug(slug: string) {
    return this.sections.find((section) => section.slug === slug);
  }

  private getFirstPendingSection(): QuestionSection {
    return this.sections.find((section) => section.state === 'pending');
  }

  private setActiveSection(section: QuestionSection) {
    if (!section || typeof section === 'undefined') {
      console.warn('Not a valid section!', section);
      return;
    }

    this.activeSection = this.translateLabels(section);

    // Store the active section in the URL:
    this.router.navigate([], {
      queryParams: { section: section.slug },
      queryParamsHandling: 'merge',
    });
  }

  private translateLabels(section: QuestionSection): QuestionSection {
    section.label = this.translatableString.get(section.label);
    section.questions = section.questions.map((question) => {
      question.label = this.translatableString.get(question.label);
      return question;
    });
    return section;
  }
}
