import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/components/shared.module';
import { ManageQuestionsPage } from './manage-questions.page';

describe('ManageQuestionsPage', () => {
  let component: ManageQuestionsPage;
  let fixture: ComponentFixture<ManageQuestionsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageQuestionsPage],
      imports: [
        IonicModule.forRoot(),
        SharedModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageQuestionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
