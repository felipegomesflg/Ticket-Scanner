import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { App, ModalController,ViewController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import * as myGlobals from '../../app/globals'

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input('title') title;

  constructor(
    private storage: Storage,
    public app: App,
    public modalCtrl: ModalController) {
    console.log('Hello HeaderComponent Component');

  }

  config() {
    console.log('ue');
    let modal = this.modalCtrl.create(configComponent);
    modal.present();
  }

  logOut() {
    this.storage.remove(myGlobals.storage).then(
      () => {
        this.app.getRootNav().setRoot(LoginPage);
      },
      error => console.error('Error storing item', error)
    );
  }
}

@Component({
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>
      Description
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>
 
</ion-content>`
})
export class configComponent {

  @Input('page') page;

  constructor( public viewCtrl: ViewController) {

   }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
