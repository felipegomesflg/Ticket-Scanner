import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController, App,Events } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import * as myGlobals from '../../app/globals';

@Component({
  selector: 'page-manual',
  templateUrl: 'manual.html'
})
export class ManualPage {
  value:string = ''
  skin:string = '';
  title:string = '';
  dateUsed: any ='';
  user:any;
  
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public app: App,
    public http: Http,
    public alertCtrl:AlertController,
    public events: Events,
    public loadingCtrl: LoadingController
  ) {
  
     this.storage.get(myGlobals.storage).then(data => {
        //this.user = JSON.parse(data);
      },
      error => console.error(error)
    );
  }

  erase(){
    this.value = this.value.slice(0,-1);
    this.value = this.value;
  }

  press(val){
    if(this.value.length>=20)
      return false;
    //this.value = this.value.substring(1);
    this.value = this.value+val;
  }

  go(){
     let loading = this.loadingCtrl.create({
      content: 'Carregando Ticket...'
    });
    // loading.present();
  
    // this.http.get(myGlobals.server+'/ticket/'+parseFloat(this.value)+'/'+this.user.funcID+'/'+this.user.nome).subscribe(val=>{
    //   loading.dismiss();
    //   if(val['_body'] != ''){
    //     this.title="Não Permitido!";
    //       this.skin="red";
    //       if(val['_body'] == '#')
    //         this.dateUsed="Ticket Inválido";  
    //       else
    //         this.dateUsed="Ticket utilizado em "+moment(val['_body']).format("DD/MM/YYYY HH:mm:ss");  
    //       setTimeout(()=>{
    //               this.return(); 
    //             }, 60000);
    //   }else{
    //     this.skin="green";
    //       this.title="Permitido!"
    //      setTimeout(()=>{
    //         this.return();
    //       }, 10000);
        
    //   }
         
    // },err=>{
    //   loading.dismiss();
    //   let alert = this.alertCtrl.create({
    //         title: 'Erro!',
    //         subTitle: err,
    //         buttons: ['OK']
    //       });
    //       alert.present(); 
          
    // });
  }

  return(){
    if(this.skin == '')
      return false;
    this.skin = '';
    this.value = '000000';
    this.dateUsed = '';
  }

}
