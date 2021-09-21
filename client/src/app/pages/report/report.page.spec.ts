import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/components/shared.module';
import { Role } from 'src/app/models/role.enum';
import { Tag } from 'src/app/models/tag.enum';
import { ReportPage } from './report.page';

describe('ReportPage', () => {
  let component: ReportPage;
  let fixture: ComponentFixture<ReportPage>;

  const mockParams = {
    role: Role.HQ,
    tag: Tag.data,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReportPage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          RouterTestingModule,
          SharedModule,
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                params: { id: 1 },
              },
              queryParams: of(mockParams),
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ReportPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
