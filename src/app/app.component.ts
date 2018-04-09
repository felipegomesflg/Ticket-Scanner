import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import{LoginPage} from '../pages/login/login';

import * as myGlobals from '../app/globals'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  fakeSplash:boolean = true;
  constructor(
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage,
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    setTimeout(()=>{
        this.fakeSplash = false;
    },4000)
    this.storage.get('PagaleeScanner').then(data=>{
      myGlobals.setServer(data);
      this.storage.get(myGlobals.storage).then(
      data => {
      if(data && data!='')
        this.rootPage = TabsPage;
      else
        this.rootPage = LoginPage;
         });
    });
  }
}
