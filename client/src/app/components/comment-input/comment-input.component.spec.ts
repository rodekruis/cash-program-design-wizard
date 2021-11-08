import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Tag } from 'src/app/models/tag.enum';
import { ProgramDataService } from 'src/app/services/program-data.service';
import { StateService } from 'src/app/services/state.service';
import { CommentInputComponent } from './comment-input.component';

describe('CommentInputComponent', () => {
  let component: CommentInputComponent;
  let fixture: ComponentFixture<CommentInputComponent>;

  const mockParams = {
    tag: Tag.data,
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [CommentInputComponent],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule,
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
          ProgramDataService,
          StateService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(CommentInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
