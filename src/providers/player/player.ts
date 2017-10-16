import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { DataProvider } from '../data/data';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);

/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayerProvider {

// Declare Vars
	
 playerSubject: any = new Subject();   
 key:any;
 searchString: any;
 queryMap:any = "players/byLastName"; 
 noRun: any = true; 



  constructor(public http: Http, public dataService: DataProvider, public zone: NgZone) {

  this.dataService.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
            if(change.doc.type === 'Player'){
              
                  this.emitPlayers();
            }
              
            
        });



    console.log('Hello PlayerProvider Provider');
  }


addPlayer(player): void {

this.dataService.db.put(player);

}



getPlayers() {


  	this.emitPlayers();

  	return this.playerSubject;

}



emitPlayers(): void {
 
        this.zone.run(() => {

     
           this.dataService.db.createIndex({
                index: {fields: ['lastName']}
            })

                 this.dataService.db.find({
                          selector: {
                                    "$or":[
                                     {lastName: {$regex:'^Rob'}},
                                     {lastName: {$regex:'^F'}}
                                                             ]
                                    }
                                          }).then((data) => {

                                             let Players = data.docs;
                                                         

          console.log(Players);

           this.playerSubject.next(Players);

                  });   // 



 
        });
 
    }



}
