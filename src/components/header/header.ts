import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import {App} from 'ionic-angular';

import{LoginPage} from '../../pages/login/login';
import * as myGlobals from '../../app/globals'

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input('title') title;

  constructor(private storage: Storage,public app: App ) {
    console.log('Hello HeaderComponent Component');

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
