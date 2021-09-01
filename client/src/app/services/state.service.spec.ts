import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Role } from '../models/role.enum';
import { Topic } from '../models/topic.enum';
import { StateService } from './state.service';

describe('StateService', () => {
  let service: StateService;

  let route: ActivatedRoute;

  const mockParams = {
    role: Role.HQ,
    topic: Topic.data,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of(mockParams),
          },
        },
      ],
    });
    route = TestBed.inject(ActivatedRoute);
    service = TestBed.inject(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set the "role"-filter to the predefined value', () => {
    expect(service.filters.role).toBe(Role.HQ);
  });

  it('should set the "topic"-filter to the predefined value', () => {
    expect(service.filters.topic).toBe(Topic.data);
  });
});
