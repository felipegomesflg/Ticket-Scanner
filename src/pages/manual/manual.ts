import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController, App,Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {ComumService} from '../../app/services/comum.service';

import * as myGlobals from '../../app/globals';
//import * as moment from 'moment';
import * as $ from 'jquery';


@Component({
  selector: 'page-manual',
  templateUrl: 'manual.html'
})
export class ManualPage {
  value:string = '74beff1e9f2c498590fca5f345702131'
  skin:string = '';
  title:string = '';
  dateUsed: any ='';
  user:any;
  Keyboard:any;
  
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
  ngAfterViewInit()
  {
    
    $('.bts.primary li').on('click',(el)=>{
      this.press($(el.target).html());
      
    })
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
    //if(this.value.split('-').length!=2 || new Date(parseFloat(this.value.split('-')[1])).getTime() == NaN ){
      if(this.value==''){
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
     let ticket = this.value;
    //  let ticket = this.value.split('-')[0];
    //  for(var i=0;i<10-this.value.split('-')[0].length;i++){
    //     ticket  = '0'+ticket;
    //  }
    // ticket = '@d' + ticket + '@t' + this.value.split('-')[1];
    this.comum.sendTicket(ticket).subscribe(async val=>{
      loading.dismiss();
      var result = JSON.parse(val['_body']);
      console.log(result);
      this.dateUsed=result.result;  
      if(result.success){
        this.skin="green";
          this.title="Permitido!"
      }else{
        this.title="Não Permitido!";
          this.skin="red";
          
        }  
        setTimeout(()=>{
          this.return();
        }, 6000);
      },err=>{
      loading.dismiss();
      if(err.status = status){
        let alert = this.alertCtrl.create({
          title: 'Sessão Encerrada!',
          subTitle: 'Sua sessão foi encerrada, favor efetuar novamente o Login',
          buttons: ['OK']
        });
        alert.present(); 
      }else{
        let alert = this.alertCtrl.create({
            title: 'Erro!',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present(); 
        }
          
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
