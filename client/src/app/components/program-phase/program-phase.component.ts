import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-phase',
  templateUrl: './program-phase.component.html',
  styleUrls: ['./program-phase.component.scss'],
})
export class ProgramPhaseComponent implements OnInit {
  @Input()
  programId: string;

  constructor() {}

  ngOnInit() {}
}
