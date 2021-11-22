import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { StateService } from 'src/app/services/state.service';
import { ReportNarrativeComponent } from './report-narrative.component';

describe('ReportNarrativeComponent', () => {
  let component: ReportNarrativeComponent;
  let fixture: ComponentFixture<ReportNarrativeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReportNarrativeComponent],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          MarkdownModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule,
        ],
        providers: [StateService],
      }).compileComponents();

      fixture = TestBed.createComponent(ReportNarrativeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
