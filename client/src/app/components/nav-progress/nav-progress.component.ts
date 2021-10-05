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

  onSave() {
    console.log('save');
  }
}
