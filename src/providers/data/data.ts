import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {


db: any;
remote: string = 'http://74.208.165.188:5984/players';


  constructor(public http: Http) {


this.db = new PouchDB('players');
 
        let options = {
          live: true,
          retry: true
        };
 
       this.db.sync(this.remote, options);





    console.log('Hello DataProvider Provider');
  }

}
