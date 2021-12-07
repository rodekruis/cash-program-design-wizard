import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiPath, ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { Program } from './../../types/program.type';

@Component({
  selector: 'app-program',
  templateUrl: './program-navigation.page.html',
  styleUrls: ['./program-navigation.page.scss'],
})
export class ProgramNavigationPage implements OnInit, OnDestroy {
  public programs: Program[];

  private userProgramsUpdates: Subscription;
  private programUpdates: Subscription;

  constructor(
    public state: StateService,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userProgramsUpdates = this.apiService
      .get(ApiPath.userPrograms)
      .subscribe((response) => {
        if (
          response.programs &&
          response.programs[0] &&
          response.programs[0].id
        ) {
          this.programs = response.programs;
          if (this.programs.length === 1) {
            this.router.navigate(['program', this.programs[0].id], {
              queryParamsHandling: 'merge',
            });
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.userProgramsUpdates) {
      this.userProgramsUpdates.unsubscribe();
    }
    this.programUpdates.unsubscribe();
  }
}
