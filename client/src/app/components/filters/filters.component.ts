import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Tag } from 'src/app/models/tag.enum';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput } from 'src/app/types/question-input.type';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  public tags: Tag[] = Object.values(Tag);

  public tagCount: Map<Tag, number> = new Map(
    Object.values(Tag).map((t) => [t, 0]), // Initiate with 0-values for all Tags:
  );
  public tagLabels: { [tag: string]: string };

  constructor(
    public state: StateService,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.tagLabels = this.translate.instant('filters.tags');
  }

  public ngOnInit() {
    this.state.sections$.subscribe((sections) => {
      this.updateTagCount(sections);
    });
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

  private updateTagCount(sections: QuestionSection[]) {
    if (!sections.length) {
      return;
    }

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
}
