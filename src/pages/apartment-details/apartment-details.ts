import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { AppointmentPage } from '../appointment/appointment';
import { SecurePage } from '../secure/secure';

@IonicPage()
@Component({
  selector: 'page-apartment-details',
  templateUrl: 'apartment-details.html',
})
export class ApartmentDetailsPage{
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams){
  	this.tab1Root = InfoPage;
  	this.tab2Root = AppointmentPage;
  	this.tab3Root = SecurePage;
  }

  gotoHome(){
    this.navCtrl.pop();
  }
  
}
