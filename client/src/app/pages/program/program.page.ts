import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {
  public id: string;

  constructor(private route: ActivatedRoute, public state: StateService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
  }
}
