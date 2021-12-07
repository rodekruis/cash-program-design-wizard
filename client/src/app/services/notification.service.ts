import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { PubSubEvent, PubSubService } from './pub-sub.service';

const enum NotificationType {
  offline,
  syncDone,
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stack: Map<NotificationType, HTMLIonToastElement> = new Map();

  constructor(
    public toastController: ToastController,
    private translate: TranslateService,
    private pubSub: PubSubService,
  ) {
    this.pubSub.subscribe(PubSubEvent.didConnectionOnline, () => {
      const offlineNotification = this.stack.get(NotificationType.offline);
      if (offlineNotification) {
        offlineNotification.dismiss();
      }
    });
    this.pubSub.subscribe(PubSubEvent.didConnectionOffline, () => {
      this.notifyOffline();
    });
    this.pubSub.subscribe(PubSubEvent.didAddSyncTask, () => {
      this.notifyOffline();
    });
    this.pubSub.subscribe(PubSubEvent.didSyncQueue, () => {
      this.notifySyncDone();
    });
    console.log('NotificationService created.');
  }

  private notifyOffline() {
    return this.presentToast(
      NotificationType.offline,
      this.translate.instant('notification.offline'),
    );
  }

  private notifySyncDone() {
    return this.presentToast(
      NotificationType.syncDone,
      this.translate.instant('notification.sync-done'),
      true,
      5000,
    );
  }

  private async presentToast(
    type: NotificationType,
    message: string,
    canDismiss = true,
    duration = 0,
  ) {
    // There can be only 1 notification of a specific type visible at any one time.
    if (this.stack.has(type)) {
      // Dismiss the existing notification
      this.stack.get(type).dismiss(
        {
          reason: 'replaced-by-new-of-same-type',
        },
        'cancel',
      );
    }

    let buttons = [];
    if (canDismiss) {
      buttons = [
        {
          role: 'cancel',
          text: this.translate.instant('common.ok'),
          side: 'end',
        },
      ];
    }
    const toast = await this.toastController.create({
      position: 'top',
      cssClass: 'notification ion-padding',
      color: 'tertiary',
      message,
      buttons,
      duration,
    });

    // Keep track of all notifications on the current 'stack':
    this.stack.set(type, toast);
    toast.onDidDismiss().then((_event) => {
      this.stack.delete(type);
    });

    return toast.present();
  }
}
