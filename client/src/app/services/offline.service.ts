import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class OfflineService {
  constructor(
    public toastController: ToastController,
    private translate: TranslateService,
  ) {}

  async presentToast() {
    const toast = await this.toastController.create({
      position: 'top',
      cssClass: 'notification',
      color: 'secondary',
      message: this.translate.instant(
        'connection-status.offline.notification-message',
      ),
    });
    toast.present();
  }
}
