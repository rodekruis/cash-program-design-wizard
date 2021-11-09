import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { StateService } from 'src/app/services/state.service';
import { NavProgressComponent } from './nav-progress.component';

describe('NavProgressComponent', () => {
  let component: NavProgressComponent;
  let fixture: ComponentFixture<NavProgressComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavProgressComponent],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule,
        ],
        providers: [StateService, AuthService],
      }).compileComponents();

      fixture = TestBed.createComponent(NavProgressComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
