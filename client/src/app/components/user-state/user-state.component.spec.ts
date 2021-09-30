import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { User, UserRole } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserStateComponent } from './user-state.component';

describe('UserStateComponent', () => {
  let component: UserStateComponent;
  let fixture: ComponentFixture<UserStateComponent>;

  const mockUser: User = {
    token: 'test',
    username: 'test@example.org',
    roles: [UserRole.admin],
  };
  const authServiceMock = {
    authenticationState$: of(mockUser),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserStateComponent],
        imports: [
          TranslateModule.forRoot(),
          RouterTestingModule,
          HttpClientTestingModule,
        ],
        providers: [
          {
            provide: AuthService,
            useValue: authServiceMock,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(UserStateComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the e-mail address of a logged-in user', () => {
    expect(fixture.nativeElement.innerHTML).toContain(mockUser.username);
  });
});
