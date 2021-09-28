import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tag } from '../models/tag.enum';
import { ViewMode } from '../models/view-mode.enum';

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

  constructor(private route: ActivatedRoute) {
    this.updateFilters();
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
}
