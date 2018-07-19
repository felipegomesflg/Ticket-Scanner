import { Injectable } from "@angular/core";
import { Http,Headers,RequestOptions } from "@angular/http";
import { Storage } from '@ionic/storage';
import { App  } from 'ionic-angular';



import * as myGlobals from '../../app/globals'

@Injectable()
export class ComumService {
    constructor( public http: Http, private storage: Storage, private app:App) {
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append('Access-Control-Allow-Methods', '*');
        this.headers.set('Authorization', 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjZlYThhZmIwMjFjMjEzMDhjNzkzMDI2ZTMzNDA4ZGI3MDc2ODc0MWEifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGFnYWxlZS1kZXYiLCJuYW1lIjoiUGFnYWxlZSBTY2FubmVyIiwicGljdHVyZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL3BhZ2FsZWUtY29tL2ltYWdlL3VwbG9hZC92MTUyMjc4OTA3My9hY2NvdW50LzAwYzhmZWFiLTgxMzctZTgxMS04MWFkLTA2ZjJkOWM2MjIwZS5wbmciLCJhdWQiOiJwYWdhbGVlLWRldiIsImF1dGhfdGltZSI6MTUyMjc4OTE4NCwidXNlcl9pZCI6IjAwYzhmZWFiLTgxMzctZTgxMS04MWFkLTA2ZjJkOWM2MjIwZSIsInN1YiI6IjAwYzhmZWFiLTgxMzctZTgxMS04MWFkLTA2ZjJkOWM2MjIwZSIsImlhdCI6MTUyMjc4OTE4NCwiZXhwIjoxNTIyNzkyNzg0LCJlbWFpbCI6InBhZ2FsZWVzY2FubmVyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJwYWdhbGVlc2Nhbm5lckBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.lSinqbxhROmVQLJ3vR76gLn-N_q6Wvcsfo8cjdgMz3forQU9giFRyz30Cg4-8T3A2JzaHK60WBo95RYNgAJqONa0DvGicZ42JCr5pEj8UtUqcoidUNESIMV1OjsiXXKSQn8FDW-crVlEUA_DY7Y-RssEOyBxR2BmCR_23X2BAT5t75REmpUfzR8L2fcQq0U8gRIUZwwgsC5Md7_996Fdh4hh2e5ysC54qJKPBBZG7vvF2B8WqZTaEV2BSqVPp66Vj25IRAYA5rfz1FOoLdz6BZzbwvAN6mXE8g7ExYt-z2qSxPDRL7UoUX5iGecZxmuHEf2JcnDSunIPsTDud1Mkmg');
        this.options = new RequestOptions({ headers: this.headers });
        this.tempHeader = this.headers;
        this.storage.get(myGlobals.storage).then(data => {
            this.tempHeader.set('Staff-Token', data.staff_token);
        });
    }
    private headers: any;
    public options: any;

    login(obj){
        return this.http.post('https://pagalee-dev.appspot.com/api/v1/events/eventstaff',obj, this.options);
    }

    tempHeader:any;
   
    
  

    sendTicket(ticket) {

        let data = {
            id: null,
            amount: 1,
            sale_product_unique_number: ticket,
            status_id: 7
        }
       
        let tempOptions = new RequestOptions({ headers: this.tempHeader });
        return this.http.post('https://pagalee-dev.appspot.com/api/v1/sales/dischargeproduct', data, tempOptions);
        
    }

    logOut(loginPage) {
        this.storage.remove(myGlobals.storage).then(
          () => {
            this.app.getRootNav().setRoot(loginPage);
          },
          error => console.error('Error storing item', error)
        );
      }
}
