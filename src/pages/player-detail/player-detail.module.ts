import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerDetailPage } from './player-detail';

@NgModule({
  declarations: [
    PlayerDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerDetailPage),
  ],
  entryComponents: [PlayerDetailPage]
})
export class PlayerDetailPageModule {}
