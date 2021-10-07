import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  public topics = ['people', 'cash', 'data', 'all'];
  public state: StateService;
  public tagCount: any;

  constructor(state: StateService) {
    this.state = state;
  }

  ngOnInit() {
    if (!this.state) {
      return;
    }

    const tags = [];

    this.state.activeSection.questions.forEach((question) =>
      tags.push(...question.tags),
    );

    this.tagCount = { all: tags.length };

    tags.forEach((tag) => (this.tagCount[tag] = this.tagCount[tag] + 1 || 1));
  }
}
