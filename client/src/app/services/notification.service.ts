import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

const enum NotificationType {
  offline,
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stack: Map<NotificationType, HTMLIonToastElement> = new Map();

  constructor(
    public toastController: ToastController,
    private translate: TranslateService,
  ) {}

  public dismissAll() {
    this.stack.forEach((toast) => {
      toast.dismiss();
    });
  }

  public notifyOffline() {
    return this.presentToast(
      NotificationType.offline,
      this.translate.instant('notification.offline'),
    );
  }

  private async presentToast(
    type: NotificationType,
    message: string,
    canDismiss = true,
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
      color: 'secondary',
      message,
      buttons,
    });

    // Keep track of all notifications on the current 'stack':
    this.stack.set(type, toast);
    toast.onDidDismiss().then((_event) => {
      this.stack.delete(type);
    });

    return toast.present();
  }
}
