import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-report-section',
  templateUrl: './report-section.component.html',
  styleUrls: ['./report-section.component.scss'],
})
export class ReportSectionComponent {
  @Input()
  public section: QuestionSection;

  public programId: string;

  constructor(private route: ActivatedRoute) {
    this.programId = this.route.snapshot.params.id;
  }
}
