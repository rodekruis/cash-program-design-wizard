import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from 'src/app/models/tag.enum';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  public tags: Tag | string[] = ['all', ...Object.values(Tag)];
  public tagCount: any = { all: 0 };
  public startingTag: string;

  constructor(
    public state: StateService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit() {
    if (!this.state || !this.route.snapshot.queryParamMap) {
      return;
    }
    this.updateStartingTag();
    this.updateTagCount();
  }

  public onChange(event: any) {
    let tag: any = event.detail.value;
    if (tag === 'all') {
      tag = null;
    }

    this.router.navigate([], {
      queryParams: { tag },
      queryParamsHandling: 'merge',
    });
  }

  private updateStartingTag() {
    this.startingTag = this.route.snapshot.queryParamMap.get('tag');
  }

  private updateTagCount() {
    const questionTags = [];

    this.state.activeSection.questions.forEach((question) =>
      questionTags.push(...question.tags),
    );

    this.tagCount.all = questionTags.length;

    questionTags.forEach(
      (tag) => (this.tagCount[tag] = this.tagCount[tag] + 1 || 1),
    );
  }
}
