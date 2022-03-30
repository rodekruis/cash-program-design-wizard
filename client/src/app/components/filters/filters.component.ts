import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/models/tag.enum';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput } from 'src/app/types/question-input.type';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  public tags: Tag[] = Object.values(Tag);

  public tagCount: Map<Tag, number>;
  public tagLabels: { [tag: string]: string };

  private sectionUpdates: Subscription;
  private labelTranslationUpdates: Subscription;

  constructor(
    public state: StateService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.resetTagCount();
  }

  public ngOnInit() {
    this.triggerTranslations();
    this.sectionUpdates = this.state.sections$.subscribe((sections) => {
      this.updateTagCount(sections);
    });
  }

  public ngOnDestroy() {
    this.sectionUpdates.unsubscribe();
    this.labelTranslationUpdates.unsubscribe();
  }

  public onChange(event: any) {
    let tag: string = event.detail.value;
    if (tag === Tag.all) {
      tag = null;
    }

    this.router.navigate([], {
      queryParams: { tag },
      queryParamsHandling: 'merge',
    });
  }

  private triggerTranslations() {
    this.tagLabels = this.translate.instant('filters.tags');
    this.labelTranslationUpdates = this.translate
      .get('filters.tags')
      .subscribe((translations) => (this.tagLabels = translations));
  }

  private updateTagCount(sections: QuestionSection[]) {
    if (!sections.length) {
      return;
    }
    this.resetTagCount();

    const allQuestions: QuestionInput[] = [];

    sections.forEach((section) => {
      section.subsections.forEach((subsection) => {
        allQuestions.push(...subsection.questions);
      });
    });

    const allTagsProps = allQuestions.map((question) => question.tags);
    const allTags: Tag[] = [].concat(...allTagsProps);

    this.tagCount.set(Tag.all, allQuestions.length);

    allTags.forEach((tag) => {
      this.tagCount.set(tag, (this.tagCount.get(tag) || 0) + 1);
    });
  }

  private resetTagCount() {
    this.tagCount = new Map(
      this.tags.map((t) => [t, 0]), // Initiate with 0-values for all Tags:
    );
  }
}
