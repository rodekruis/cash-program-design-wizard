import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { getMockId } from '../mocks/mock-helpers';
import { Tag } from '../models/tag.enum';
import { User, UserRole } from '../models/user.model';
import { AuthService } from './auth.service';
import { ProgramDataService } from './program-data.service';
import { StateService } from './state.service';
import { TranslatableStringService } from './translatable-string.service';

describe('StateService', () => {
  let service: StateService;

  let route: ActivatedRoute;

  const mockParams = {
    tag: Tag.people,
  };

  const mockUser: User = {
    token: 'test',
    id: getMockId(),
    userName: 'test@example.org',
    roles: [UserRole.admin],
  };
  const authServiceMock = {
    authenticationState$: of(mockUser),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(mockParams),
          },
        },
        TranslatableStringService,
        ProgramDataService,
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    });
    route = TestBed.inject(ActivatedRoute);
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the "tag"-filter to the predefined value', () => {
    expect(service.filters.tag).toBe(Tag.people);
  });
});
