import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-apartment-details',
  templateUrl: 'apartment-details.html',
})
export class ApartmentDetailsPage{
  tab1Root: string;
  tab2Root: string;
  tab3Root: string;
 
  constructor(public navCtrl: NavController, public navParams: NavParams){
  	this.tab1Root = 'InfoPage';
  	this.tab2Root = 'AppointmentPage';
  	this.tab3Root = 'SecurePage';
  }

  gotoHome(){
    this.navCtrl.popToRoot().then(value =>{
      this.navCtrl.setRoot('PrefferencesPage');
    })
  }
  
}
