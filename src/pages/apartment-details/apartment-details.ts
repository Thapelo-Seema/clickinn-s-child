import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { AppointmentPage } from '../appointment/appointment';
import { SecurePage } from '../secure/secure';
import { WelcomePage } from '../welcome/welcome';

@IonicPage()
@Component({
  selector: 'page-apartment-details',
  templateUrl: 'apartment-details.html',
})
export class ApartmentDetailsPage{
  tab1Root: any = InfoPage;
  tab2Root: any = AppointmentPage;
  tab3Root: any = SecurePage;
 
  constructor(public navCtrl: NavController){
  }

  gotoHome(){
    this.navCtrl.push(WelcomePage)
  }
  
}
