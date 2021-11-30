import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private stack: HTMLIonToastElement[] = [];

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
    return this.presentToast(this.translate.instant('notification.offline'));
  }

  private async presentToast(message: string, canDismiss = true) {
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
    this.stack.push(toast);
    toast.onDidDismiss().then((_event) => {
      this.stack.splice(this.stack.indexOf(toast));
    });
    return toast.present();
  }
}
