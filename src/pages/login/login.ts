import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams,AlertController, LoadingController  } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import * as myGlobals from '../../app/globals'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor( public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }
  
  txtLogin:string;
  txtSenha:string;

  login(){
    let loading = this.loadingCtrl.create({
          content: 'Confirmando Login e Senha...'
        });
        loading.present();
        this.createCookie('logado');
        loading.dismiss();
    /*this.http.get(myGlobals.server+'/funcionarios/login/'+this.txtLogin+'/'+this.txtSenha).subscribe(val=>{
      loading.dismiss();
        if(val['_body']!=null){
          this.createCookie(val['_body'])
        }else{
           let alert = this.alertCtrl.create({
            title: 'Atenção!',
            subTitle: 'Login e/ou Senha Incorretos!',
            buttons: ['OK']
          });
          alert.present(); 
        }
    },err=>{
      loading.dismiss();
      let alert = this.alertCtrl.create({
            title: 'Erro!',
            subTitle: 'Erro com o Host configurado!',
            buttons: ['OK']
          });
          alert.present(); 
          
    })*/
  }
  createCookie(user){
     this.storage.set(myGlobals.storage, user).then(
      () => this.navCtrl.setRoot(TabsPage),
      error => console.error('Error storing item', error)
    );
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
