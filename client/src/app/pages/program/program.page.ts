import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiPath, ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/services/state.service';
import { TranslatableString } from 'src/app/types/translatable-string.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {
  public isDebug = environment.debug;
  public id: string;
  public name: string | TranslatableString;

  constructor(
    private route: ActivatedRoute,
    public state: StateService,
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    if (!this.id) {
      this.apiService.get(ApiPath.userPrograms).subscribe((response) => {
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
    }

    // Use sections-update 'event' to update Program-name
    this.state.sections$.subscribe((_sections) => {
      this.name = this.state.programName;
    });
  }
}
