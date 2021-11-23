import { Component, OnDestroy, OnInit } from '@angular/core';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.scss'],
})
export class ConnectionStatusComponent implements OnInit, OnDestroy {
  public isOnline: boolean;
  public showOffline: boolean;

  constructor(private syncService: SyncService) {}

  ngOnInit() {
    this.isOnline = window.navigator.onLine;
    this.showOffline = this.syncService.forceOffline;

    window.addEventListener('offline', () => this.updateOnlineState(), {
      passive: true,
    });
    window.addEventListener('online', () => this.updateOnlineState, {
      passive: true,
    });
  }

  ngOnDestroy() {
    window.removeEventListener('offline', () => this.updateOnlineState);
    window.removeEventListener('online', () => this.updateOnlineState);
  }

  public changeSync(doSync: boolean) {
    this.syncService.forceOffline = !doSync;

    if (this.syncService.forceOffline) {
      this.showOffline = true;
      return;
    }

    if (this.isOnline && doSync) {
      this.showOffline = false;

      this.syncService.processQueue();
    }
  }

  private updateOnlineState() {
    this.isOnline = window.navigator.onLine;
  }
}
