import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../components/shared.module';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { StateService } from '../services/state.service';
import { TranslatableStringService } from '../services/translatable-string.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomePage],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          SharedModule,
          RouterTestingModule,
          HttpClientTestingModule,
        ],
        providers: [
          StateService,
          ApiService,
          TranslatableStringService,
          JwtService,
          AuthService,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HomePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
