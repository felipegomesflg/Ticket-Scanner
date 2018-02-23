import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import * as myGlobals from '../../app/globals'

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public events: Events,
    public app: App,
    public loadingCtrl: LoadingController,
    public http: Http) {

    this.storage.get(myGlobals.storage).then(data => {
      //this.user = JSON.parse(data);
      //this.loadHistory();
    })
  }

  user:any;
  history:any = [];

  loadHistory() {
    let loading = this.loadingCtrl.create({
      content: 'Carregando Histórico...'
    });
    loading.present();
    this.http.get(myGlobals.server + '/ticket/getHistory/' + this.user.funcID).subscribe(val => {
      loading.dismiss();
      this.history = JSON.parse(val['_body']);
    },
      error => console.error(error)
    );
  }

  searchHistory(ev){
     
     // set val to the value of the ev target
     var val = ev.target.value;
 
     // if the value is an empty string don't filter the items
     if (val && val.trim() != '') {
       this.history = this.history.filter((item) => {
         return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
       })
     }

  }


}
