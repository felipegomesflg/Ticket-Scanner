import { Component, Input } from '@angular/core';
import { App, ModalController,ViewController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';

import { ComumService } from "./../../app/services/comum.service";

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input('title') title;

  constructor(
    public app: App,
    public comum:ComumService,
    public modalCtrl: ModalController) {

  }

  config() {
    let modal = this.modalCtrl.create(configComponent);
    modal.present();
  }
  logOut() {
    this.comum.logOut(LoginPage);
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
