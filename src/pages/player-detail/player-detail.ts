import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlayerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-detail',
  templateUrl: 'player-detail.html',
})
export class PlayerDetailPage {


playerRecord:any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {


  	this.playerRecord = this.navParams.get('recordParam');
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerDetailPage');
  }

}
