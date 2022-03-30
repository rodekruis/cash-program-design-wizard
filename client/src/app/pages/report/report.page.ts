import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewDidEnter } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { StateService } from 'src/app/services/state.service';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit, OnDestroy, ViewDidEnter {
  public id: string;
  public name: string;

  public sections: QuestionSection[];

  private programUpdates: Subscription;
  private sectionUpdates: Subscription;
  private fragmentUpdates: Subscription;

  constructor(private route: ActivatedRoute, public state: StateService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.state.initProgramData(this.id);
    }

    this.programUpdates = this.state.programMetaData$.subscribe((program) => {
      this.name = program.name as string;
    });
    this.sectionUpdates = this.state.sections$.subscribe((sections) => {
      this.sections = sections;
      this.tryScrollDown(this.route.snapshot.fragment);
    });

    this.fragmentUpdates = this.route.fragment.subscribe((fragment) => {
      this.tryScrollDown(fragment);
    });
  }

  ngOnDestroy() {
    this.programUpdates.unsubscribe();
    this.sectionUpdates.unsubscribe();
    this.fragmentUpdates.unsubscribe();
  }

  ionViewDidEnter() {
    if (this.route.snapshot.fragment) {
      this.tryScrollDown(this.route.snapshot.fragment);
    }
  }

  private tryScrollDown(fragment: string) {
    if (!fragment) {
      return;
    }

    const element = document.getElementById(fragment);

    if (!element) {
      window.setTimeout(() => {
        this.tryScrollDown(fragment);
      }, 600);
      return;
    }
    element.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
    element.focus();
  }
}
