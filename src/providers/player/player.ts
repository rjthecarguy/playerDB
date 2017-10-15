import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { DataProvider } from '../data/data';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';

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

          this.key = this.searchString;
 
            this.dataService.db.query(this.queryMap, {startkey:this.key, endkey:this.key+ "\u9999"}).then((data) => {
 
                let Players = data.rows.map(row => {
                    return row.value;
                });
 
                this.playerSubject.next(Players);
 
            });
 
        });
 
    }



}
