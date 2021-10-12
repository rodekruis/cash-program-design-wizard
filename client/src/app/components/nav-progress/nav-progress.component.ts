import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-nav-progress',
  templateUrl: './nav-progress.component.html',
  styleUrls: ['./nav-progress.component.scss'],
})
export class NavProgressComponent implements OnInit {
  constructor(private state: StateService) {}

  ngOnInit() {}

  public hasPrevSection(): boolean {
    if (!this.state.activeSection) {
      return false;
    }
    const prevSectionIndex =
      this.state.sections.indexOf(this.state.activeSection) - 1;
    return prevSectionIndex >= 0;
  }

  public hasNextSection(): boolean {
    if (!this.state.activeSection) {
      return false;
    }
    const nextSectionIndex =
      this.state.sections.indexOf(this.state.activeSection) + 1;
    return nextSectionIndex < this.state.sections.length;
  }

  public goPrevSection() {
    const prevSectionIndex =
      this.state.sections.indexOf(this.state.activeSection) - 1;
    this.state.setActiveSection(this.state.sections[prevSectionIndex]);
  }
  public goNextSection() {
    const nextSectionIndex =
      this.state.sections.indexOf(this.state.activeSection) + 1;
    this.state.setActiveSection(this.state.sections[nextSectionIndex]);
  }

  public onSave() {
    console.log(
      `NavProgress: Save Section : ${this.state.activeSection.id} : ${this.state.activeSection.label}`,
    );
  }
}
