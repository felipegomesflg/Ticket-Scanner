import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { HistoryPage } from '../history/history';
import { HomePage } from '../home/home';
import { ManualPage } from '../manual/manual';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  constructor( public screenOrientation: ScreenOrientation,public platform: Platform){
  }

  portrait(){
    if(this.platform.is('core'))
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  landscape(){
    if(this.platform.is('core'))
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  homeRoot = HomePage;
  historyRoot = HistoryPage;
  manualRoot = ManualPage;


}
