import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchfeedPage } from '../searchfeed/searchfeed';
import { ChatsPage } from '../chats/chats';
import { BookingsPage } from '../bookings/bookings';
import { ManageBuildingsPage } from '../manage-buildings/manage-buildings';

/**
 * Generated class for the LandlordDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-landlord-dashboard',
  templateUrl: 'landlord-dashboard.html',
})
export class LandlordDashboardPage {
  tab1Root: any = SearchfeedPage;
  tab2Root: any = ManageBuildingsPage;
  tab3Root: any = BookingsPage;
  tab4Root: any = ChatsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandlordDashboardPage');
  }

}
