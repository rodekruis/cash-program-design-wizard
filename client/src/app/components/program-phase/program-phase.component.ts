import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-program-phase',
  templateUrl: './program-phase.component.html',
  styleUrls: ['./program-phase.component.scss'],
})
export class ProgramPhaseComponent {
  @Input()
  programId: string;

  constructor() {}
}
