import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { mockProgram } from '../mocks/program.mock';
import { Tag } from '../models/tag.enum';
import { Program, ProgramMetaData } from '../types/program.type';
import { QuestionSection } from '../types/question-section.type';
import { AuthService } from './auth.service';
import { ProgramDataService } from './program-data.service';
import { TranslatableStringService } from './translatable-string.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public programId: string;

  public filters: {
    tag: Tag;
  } = {
    tag: Tag.all,
  };

  public programMetaData$: Observable<ProgramMetaData>;

  public activeSection: QuestionSection;

  public sections$: Observable<QuestionSection[]>;

  private sectionsStore = new BehaviorSubject<QuestionSection[]>([]);
  private sections: QuestionSection[] = [];

  private programMetaData: ProgramMetaData = {
    id: null,
    name: '',
  };
  private programMetaDataStore = new BehaviorSubject<ProgramMetaData>(
    this.programMetaData,
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translatableString: TranslatableStringService,
    private programDataService: ProgramDataService,
    private authService: AuthService,
  ) {
    this.sections$ = this.sectionsStore.asObservable();
    this.programMetaData$ = this.programMetaDataStore.asObservable();

    this.updateProgramId();
    this.updateFilters();

    this.authService.authenticationState$.subscribe((user) => {
      // Reset state when user is logged out
      if (!user) {
        this.clearState();
      }
    });
  }

  public setActiveSection(section: QuestionSection, updateUrl = true) {
    if (!section || typeof section === 'undefined') {
      console.warn('Not a valid section!', section);
      return;
    }

    this.activeSection = section;

    if (updateUrl) {
      // Store the active section in the URL:
      this.router.navigate([], {
        queryParams: { section: section.name },
        queryParamsHandling: 'merge',
      });
    }
  }

  public saveAnswersActiveSection() {
    console.log(
      `SaveAnswers ActiveSection : ${this.activeSection.id} : ${this.activeSection.label}`,
    );

    this.activeSection.subsections.forEach((subsection) => {
      subsection.questions.forEach((question) => {
        this.programDataService.saveAnswer(this.programId, question);
      });
    });
  }

  private updateProgramId() {
    // Take the ProgramId from the URL (when/if available)
    this.router.events.subscribe(async (event: ActivationStart) => {
      if (
        event.snapshot &&
        event.snapshot.params &&
        event.snapshot.params.id &&
        this.programId !== event.snapshot.params.id
      ) {
        this.programId = event.snapshot.params.id;
        this.setProgramMetaData('id', event.snapshot.params.id);

        // Trigger the retrieval of the Program-data here, for lack of a better mechanism. :/
        await this.updateSections();
        this.updateActiveSectionFromUrl();
      }
    });
  }

  private async updateFilters() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.tag && Tag[queryParams.tag]) {
        this.filters.tag = queryParams.tag;
      } else {
        this.filters.tag = Tag.all;
      }
    });
  }

  private async updateSections() {
    let program: Program;
    // Hard-code mock-data in
    if (environment.useMockData && this.programId === '123') {
      console.warn('Using mock-data!');
      program = mockProgram;
    } else {
      program = await this.programDataService.getProgram(this.programId);
    }

    // Update Program meta-data
    this.setProgramMetaData('name', this.translatableString.get(program.name));
    this.setProgramMetaData(
      'narrativeReportTemplate',
      program.narrativeReportTemplate,
    );

    // Update all sections
    const sections = program.sections.map((section) =>
      this.translateLabels(section),
    );
    this.sections = sections;
    this.sectionsStore.next(sections);
  }

  private async updateActiveSectionFromUrl() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.section) {
        this.setActiveSection(
          this.getSectionByName(queryParams.section),
          false,
        );
      } else {
        // Reset to the start, if no section requested
        this.setActiveSection(this.getFirstPendingSection(), false);
      }
    });
  }

  private getSectionByName(name: string): QuestionSection {
    if (!this.sections) {
      return;
    }
    return this.sections.find((section) => section.name === name);
  }

  private getFirstPendingSection(): QuestionSection {
    // Don't take the real state into account yet...
    return this.sections[0];
  }

  private translateLabels(section: QuestionSection): QuestionSection {
    section.label = this.translatableString.get(section.label);
    section.subsections = section.subsections.map((subsection) => {
      subsection.questions.map((question) => {
        question.label = this.translatableString.get(question.label);

        if (question.optionChoices && question.optionChoices.length) {
          question.optionChoices = question.optionChoices.map((option) => {
            option.label = this.translatableString.get(option.label);
            return option;
          });
        }

        return question;
      });
      return subsection;
    });
    return section;
  }

  private setProgramMetaData(property: keyof ProgramMetaData, value: any) {
    this.programMetaData[property] = value;
    this.programMetaDataStore.next(this.programMetaData);
  }

  private clearState() {
    this.filters = { tag: Tag.all };
    this.activeSection = null;
    this.sections = [];
    this.sectionsStore.next(this.sections);
    this.programMetaDataStore.next({
      id: null,
      name: '',
    });
  }
}
