import { Component } from '@angular/core';

import { HistoryPage } from '../history/history';
import { HomePage } from '../home/home';
import { ManualPage } from '../manual/manual';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  historyRoot = HistoryPage;
  manualRoot = ManualPage;

  constructor() {

  }
}
