import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  public id: string;

  constructor(private route: ActivatedRoute, public state: StateService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
  }
}
