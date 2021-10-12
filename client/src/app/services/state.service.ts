import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
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
    this.updateProgramId();
    this.updateFilters();

    this.getSections();

    this.updateActiveSectionFromUrl();

    if (!this.activeSection) {
      this.setActiveSection(this.getFirstPendingSection());
    }
  }

  public setActiveSection(section: QuestionSection) {
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

  private updateProgramId() {
    // Take the ProgramId from the URL (when/if available)
    this.router.events.subscribe((event: ActivationStart) => {
      if (event.snapshot && event.snapshot.params && event.snapshot.params.id) {
        this.programId = event.snapshot.params.id;
      }
    });
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
    // Don't take the real state into account yet...
    return this.sections[0];
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
