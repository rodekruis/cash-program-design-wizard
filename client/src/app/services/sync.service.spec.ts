import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { SyncService } from './sync.service';

describe('SyncService', () => {
  let service: SyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(SyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
