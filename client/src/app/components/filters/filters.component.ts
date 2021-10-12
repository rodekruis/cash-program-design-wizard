import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public tags: Tag | string[] = ['all', ...Object.values(Tag)];
  public tagCount: { [tag: string]: number } = { all: 0 };

  constructor(public state: StateService, private router: Router) {}

  public ngOnInit() {
    this.state.sections$.subscribe((sections) => this.updateTagCount(sections));
  }

  public onChange(event: any) {
    let tag: string = event.detail.value;
    if (tag === 'all') {
      tag = null;
    }

    this.router.navigate([], {
      queryParams: { tag },
      queryParamsHandling: 'merge',
    });
  }

  private updateTagCount(sections: QuestionSection[]) {
    const sectionQuestions = sections.map((section) => section.questions);
    const allQuestions: QuestionInput[] = [].concat(...sectionQuestions);
    const allTagsProps = allQuestions.map((question) => question.tags);
    const allTags: Tag[] = [].concat(...allTagsProps);

    this.tagCount = {
      all: allQuestions.length,
    };

    allTags.forEach((tag) => {
      this.tagCount[tag] = (this.tagCount[tag] || 0) + 1;
    });
  }
}
