import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { QuestionSection } from 'src/app/types/question-section.type';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  public id: string;
  public name: string;

  public sections: QuestionSection[];

  constructor(private route: ActivatedRoute, public state: StateService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.state.programMetaData$.subscribe((program) => {
      this.name = program.name as string;
    });
    this.state.sections$.subscribe((sections) => (this.sections = sections));
  }
}
