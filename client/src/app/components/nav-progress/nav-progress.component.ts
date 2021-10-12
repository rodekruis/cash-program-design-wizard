import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-nav-progress',
  templateUrl: './nav-progress.component.html',
  styleUrls: ['./nav-progress.component.scss'],
})
export class NavProgressComponent implements OnInit {
  constructor(public state: StateService) {}

  ngOnInit() {}

  public hasPrevSection(): boolean {
    return this.state.sections.indexOf(this.state.activeSection) - 1 < 0;
  }

  public hasNextSection(): boolean {
    return (
      this.state.sections.indexOf(this.state.activeSection) + 1 >=
      this.state.sections.length
    );
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
