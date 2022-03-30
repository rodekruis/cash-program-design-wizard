import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SyncService } from 'src/app/services/sync.service';
import { SharedModule } from '../shared.module';
import { ConnectionStatusComponent } from './connection-status.component';

describe('ConnectionStatusComponent', () => {
  let component: ConnectionStatusComponent;
  let fixture: ComponentFixture<ConnectionStatusComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ConnectionStatusComponent],
        imports: [
          IonicModule.forRoot(),
          TranslateModule.forRoot(),
          HttpClientTestingModule,
          RouterTestingModule,
          SharedModule,
        ],
        providers: [SyncService],
      }).compileComponents();

      fixture = TestBed.createComponent(ConnectionStatusComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
