import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerProvider} from '../../providers/player/player';
import { PlayerDetailPage } from '../../pages/player-detail/player-detail'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



searchForm: FormGroup;
playerRecord: any;
searchString:any;;
searchLast:boolean = true;


  constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public playerService: PlayerProvider) {


  	this.searchForm = formBuilder.group({
        lastName: ['',Validators.compose([Validators.required])]
    });

  }


search()  {

this.playerService.searchString = this.searchForm.controls.lastName.value;

this.playerService.getPlayers();

console.log("Search");	

}


setSearchLast() {

this.searchLast = true;
this.playerService.queryMap ="players/byLastName";

}

setSearchFirst() {

this.searchLast = false;
this.playerService.queryMap ="players/byFirstName";

}


playerDetails(player) {

this.navCtrl.push(PlayerDetailPage, {recordParam:player});
}



ionViewDidLoad() {

  	this.playerService.getPlayers().subscribe((Player) => {
 	this.playerRecord = Player;
            
    });

  	
  }



}
