import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit, OnDestroy {
  public id: string;
  public name: string;

  public sections: QuestionSection[];

  private programUpdates: Subscription;
  private sectionUpdates: Subscription;

  constructor(private route: ActivatedRoute, public state: StateService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.state.initProgramData(this.id);
    }

    this.programUpdates = this.state.programMetaData$.subscribe((program) => {
      this.name = program.name as string;
    });
    this.sectionUpdates = this.state.sections$.subscribe(
      (sections) => (this.sections = sections),
    );
  }

  ngOnDestroy() {
    this.programUpdates.unsubscribe();
    this.sectionUpdates.unsubscribe();
  }
}
