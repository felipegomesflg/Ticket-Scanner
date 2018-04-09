import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController, App,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {ComumService} from '../../app/services/comum.service';
import * as myGlobals from '../../app/globals';
import * as moment from 'moment';

@Component({
  selector: 'page-manual',
  templateUrl: 'manual.html'
})
export class ManualPage {
  value:string = '6-1519416858874'
  skin:string = '';
  title:string = '';
  dateUsed: any ='';
  user:any;
  
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    public app: App,
    public alertCtrl:AlertController,
    public events: Events,
    public loadingCtrl: LoadingController,
    public comum:ComumService
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
    
    //console.log(moment.unix(parseFloat(this.value.split('-')[1])));
    if(this.value.split('-').length!=2 || new Date(parseFloat(this.value.split('-')[1])).getTime() == NaN ){
      let alert = this.alertCtrl.create({
        title: 'Ticket Inválido',
        subTitle: 'Número do ticket inválido',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }
     let loading = this.loadingCtrl.create({
      content: 'Carregando Ticket...'
    });
     loading.present();
     let ticket = this.value.split('-')[0];
     for(var i=0;i<10-this.value.split('-')[0].length;i++){
        ticket  = '0'+ticket;
     }
    ticket = '@d' + ticket + '@t' + this.value.split('-')[1];
    this.comum.sendTicket(ticket).subscribe(val=>{
      loading.dismiss();
      if(val['_body'] != ''){
        this.title="Não Permitido!";
          this.skin="red";
          this.dateUsed="Ticket Inválido";  
          // if(val['_body'] == '#')
          //   this.dateUsed="Ticket Inválido";  
          // else
          //   this.dateUsed="Ticket utilizado em "+moment(val['_body']).format("DD/MM/YYYY HH:mm:ss");  
          setTimeout(()=>{
                  this.return(); 
                }, 60000);
      }else{
        this.skin="green";
          this.title="Permitido!"
         setTimeout(()=>{
            this.return();
          }, 10000);
        
      }
         
    },err=>{
      loading.dismiss();
      let alert = this.alertCtrl.create({
            title: 'Erro!',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present(); 
          
    });
  }

  return(){
    if(this.skin == '')
      return false;
    this.skin = '';
    this.value = '000000';
    this.dateUsed = '';
  }

}
