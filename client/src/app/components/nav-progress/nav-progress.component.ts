import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-nav-progress',
  templateUrl: './nav-progress.component.html',
  styleUrls: ['./nav-progress.component.scss'],
})
export class NavProgressComponent implements OnInit {
  private sections: QuestionSection[];

  constructor(public state: StateService) {}

  ngOnInit() {
    this.state.sections$.subscribe((sections) => (this.sections = sections));
  }

  public hasPrevSection(): boolean {
    if (!this.state.activeSection) {
      return false;
    }
    const prevSectionIndex =
      this.sections.indexOf(this.state.activeSection) - 1;
    return prevSectionIndex >= 0;
  }

  public hasNextSection(): boolean {
    if (!this.state.activeSection) {
      return false;
    }
    const nextSectionIndex =
      this.sections.indexOf(this.state.activeSection) + 1;
    return nextSectionIndex < this.sections.length;
  }

  public goPrevSection() {
    const prevSectionIndex =
      this.sections.indexOf(this.state.activeSection) - 1;
    this.state.setActiveSection(this.sections[prevSectionIndex]);
  }
  public goNextSection() {
    const nextSectionIndex =
      this.sections.indexOf(this.state.activeSection) + 1;
    this.state.setActiveSection(this.sections[nextSectionIndex]);
  }
}
