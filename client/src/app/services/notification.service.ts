import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    public toastController: ToastController,
    private translate: TranslateService,
  ) {}

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
    return toast.present();
  }
}
