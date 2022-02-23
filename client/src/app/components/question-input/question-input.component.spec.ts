import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { getMockId } from 'src/app/mocks/mock-helpers';
import { Tag } from 'src/app/models/tag.enum';
import { ProgramDataService } from 'src/app/services/program-data.service';
import { StateService } from 'src/app/services/state.service';
import { QuestionInput, QuestionType } from 'src/app/types/question-input.type';
import { QuestionInputComponent } from './question-input.component';

describe('QuestionInputComponent', () => {
  let component: QuestionInputComponent;
  let fixture: ComponentFixture<QuestionInputComponent>;

  const mockStateService: StateService = jasmine.createSpyObj('StateServcie', {
    programId: '123',
    filters: {
      tags: [Tag.data],
    },
  });
  const mockQuestion: QuestionInput = {
    id: getMockId(),
    name: 'test-question-01',
    type: QuestionType.text,
    label: { en: 'Question Label' },
    answer: 'test',
    storedAnswer: 'test',
    tags: [Tag.data],
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [QuestionInputComponent],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          MarkdownModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule,
        ],
        providers: [
          {
            provide: StateService,
            useValue: mockStateService,
          },
          ProgramDataService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(QuestionInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    component.question = mockQuestion;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
