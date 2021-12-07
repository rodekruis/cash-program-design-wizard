import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/components/shared.module';
import { Tag } from 'src/app/models/tag.enum';
import { StateService } from 'src/app/services/state.service';
import { ProgramNavigationPage } from './program-navigation.page';

describe('ProgramNavigationPage', () => {
  let component: ProgramNavigationPage;
  let fixture: ComponentFixture<ProgramNavigationPage>;

  const mockParams = {
    tag: Tag.data,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProgramNavigationPage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
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
          StateService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(ProgramNavigationPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
