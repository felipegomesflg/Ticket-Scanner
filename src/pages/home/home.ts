import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import {NavController,AlertController,LoadingController, App} from 'ionic-angular';
import{ BarcodeScannerOptions, BarcodeScanner} from '@ionic-native/barcode-scanner';
import { Http } from '@angular/http';

import {ComumService} from '../../app/services/comum.service';
import * as myGlobals from '../../app/globals'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  skin:any = 'blue';
  title:any = 'Scanear';
  dateUsed: any ='';
  subtitle:any = 'Toque no icone para Scanear';
  options: BarcodeScannerOptions;
  user:any;

  constructor( public navCtrl: NavController, 
    public app: App, 
    public barcode:BarcodeScanner,
    public alertCtrl:AlertController,
    public events: Events,
    public comum:ComumService,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public http: Http) {
      
      this.storage.get(myGlobals.storage).then(data => {
        // this.user = JSON.parse(data);
        // console.log(this.user);
      },
      error => console.error(error)
    );
  }

readQR(){
  
  // //let uid = "-KirQyj3zGtrPful-K1s";
  this.barcode.scan({formats:"QR_CODE"}).then((barcodeData) => {
    
    //let uid = barcodeData.text;
      if(barcodeData.text){
        let loading = this.loadingCtrl.create({
          content: 'Carregando Ticket...'
        });
        loading.present();
        //this.http.get(myGlobals.server+'/ticket/'+barcodeData.text+'/'+this.user.funcID+'/'+this.user.nome)
        this.comum.sendTicket(barcodeData.text).subscribe(val=>{
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
          this.subtitle="Toque na tela para voltar";
      }
     }, (err) => {
       this.title = err;
       //this.errorAlert(err);
     });

  }



return(){
  if(this.skin == 'blue')
    return false;
  this.skin ='blue';
  this.title="Scanear";
  this.subtitle="Toque no icone para Scanear";
  this.dateUsed = '';
  this.readQR(); 
}
  errorAlert(msg) {
    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}


