import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Role } from '../models/role.enum';
import { Topic } from '../models/topic.enum';
import { ViewMode } from '../models/view-mode.enum';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public programId: string;

  public filters: {
    role: Role | '';
    topic: Topic | '';
  } = {
    role: '',
    topic: '',
  };

  public viewMode: ViewMode = ViewMode.view;

  constructor(private route: ActivatedRoute) {
    this.updateFilters();
  }

  private async updateFilters() {
    this.route.queryParams.subscribe((queryParams) => {
      if (queryParams.role && Role[queryParams.role]) {
        this.filters.role = queryParams.role;
      }
      if (queryParams.topic && Topic[queryParams.topic]) {
        this.filters.topic = queryParams.topic;
      }
    });
  }
}
