import { Component, OnInit } from '@angular/core';
import { SyncService } from 'src/app/services/sync.service';

@Component({
  selector: 'app-connection-status',
  templateUrl: './connection-status.component.html',
  styleUrls: ['./connection-status.component.scss'],
})
export class ConnectionStatusComponent implements OnInit {
  public isOnline: boolean;
  public showOffline: boolean;

  constructor(private syncService: SyncService) {}

  ngOnInit() {
    this.isOnline = window.navigator.onLine;
    this.showOffline = this.syncService.forceOffline;

    window.addEventListener(
      'offline',
      () => (this.isOnline = window.navigator.onLine),
      { passive: true },
    );
    window.addEventListener(
      'online',
      () => (this.isOnline = window.navigator.onLine),
      { passive: true },
    );
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
}
