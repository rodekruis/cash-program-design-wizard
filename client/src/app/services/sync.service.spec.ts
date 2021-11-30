import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ApiService } from './api.service';
import { PubSubService } from './pub-sub.service';
import { SyncService } from './sync.service';

describe('SyncService', () => {
  let service: SyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [PubSubService, ApiService],
    });
    service = TestBed.inject(SyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
