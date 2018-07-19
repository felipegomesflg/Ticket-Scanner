import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';


import { HistoryPage } from '../pages/history/history';
import { ManualPage } from '../pages/manual/manual';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import {HeaderComponent,configComponent} from '../components/header/header'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import {ComumService} from './services/comum.service';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    HistoryPage,
    ManualPage,
    HomePage,
    TabsPage,
    LoginPage,
    HeaderComponent,
    configComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HistoryPage,
    ManualPage,
    HomePage,
    TabsPage,
    LoginPage,
    HeaderComponent,
    configComponent
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    ComumService,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
