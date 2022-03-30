import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/models/tag.enum';
import { UserRole } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput } from 'src/app/types/question-input.type';
import {
  QuestionSection,
  QuestionSubsection,
} from 'src/app/types/question-section.type';

@Component({
  selector: 'app-question-section',
  templateUrl: './question-section.component.html',
  styleUrls: ['./question-section.component.scss'],
})
export class QuestionSectionComponent implements OnInit, OnDestroy {
  @Input()
  section: QuestionSection;

  public canEdit = false;

  private sectionUpdates: Subscription;

  constructor(private state: StateService, private authService: AuthService) {}

  ngOnInit() {
    // Use sections-update 'event' to get up-to-date Program-MetaData
    this.sectionUpdates = this.state.sections$.subscribe((_sections) => {
      this.canEdit = this.userCanEdit();
    });
  }

  ngOnDestroy() {
    this.sectionUpdates.unsubscribe();
  }

  public shouldShowQuestion(questionTags: QuestionInput['tags']): boolean {
    return (
      this.state.filters.tag === Tag.all ||
      (questionTags &&
        questionTags.length &&
        questionTags.includes(this.state.filters.tag))
    );
  }

  public isSubSectionEmpty(subsection: QuestionSubsection): boolean {
    if (
      !subsection.questions ||
      (this.state.filters.tag !== Tag.all &&
        !subsection.questions.some(
          (question) =>
            question.tags &&
            question.tags.length &&
            question.tags.includes(this.state.filters.tag),
        ))
    ) {
      return true;
    }

    return false;
  }

  public isSectionEmpty(section: QuestionSection): boolean {
    return (
      section &&
      section.subsections.every((subsection) =>
        this.isSubSectionEmpty(subsection),
      )
    );
  }

  public userCanEdit(): boolean {
    return this.authService.hasUserRole([UserRole.edit], this.state.programId);
  }
}
