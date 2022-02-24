import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiPath, ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit, OnDestroy {
  public id: string;
  public name: string;

  private userProgramsUpdates: Subscription;
  private programUpdates: Subscription;

  constructor(
    private route: ActivatedRoute,
    public state: StateService,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.programUpdates = this.state.programMetaData$.subscribe((program) => {
      this.name = program.name as string;
    });
  }

  ionViewWillEnter() {
    this.id = this.route.snapshot.params.id;

    if (!this.id) {
      this.userProgramsUpdates = this.apiService
        .get(ApiPath.userPrograms)
        .subscribe((response) => {
          if (
            response.programs &&
            response.programs[0] &&
            response.programs[0].id
          ) {
            this.id = response.programs[0].id;
            this.router.navigate(['program', this.id], {
              queryParamsHandling: 'merge',
            });
          }
        });
      return;
    }

    if (this.id) {
      this.state.initProgramData(this.id);
    }
  }

  ngOnDestroy() {
    if (this.userProgramsUpdates) {
      this.userProgramsUpdates.unsubscribe();
    }
    this.programUpdates.unsubscribe();
  }
}
