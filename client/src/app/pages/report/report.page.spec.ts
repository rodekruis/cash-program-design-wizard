import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/components/shared.module';
import { Tag } from 'src/app/models/tag.enum';
import { AuthService } from 'src/app/services/auth.service';
import { ReportPage } from './report.page';

describe('ReportPage', () => {
  let component: ReportPage;
  let fixture: ComponentFixture<ReportPage>;

  const mockParams = {
    tag: Tag.data,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReportPage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          MarkdownModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule,
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
          AuthService,
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
