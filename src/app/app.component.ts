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

  constructor(
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private storage: Storage,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
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
