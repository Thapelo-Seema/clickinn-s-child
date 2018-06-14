import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {
  confirmation ={
		title: 'string',
 		message: 'string'
  }
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewWillLoad() {
    this.confirmation = this.navParams.get('data');  
  }

  close(){
  	this.viewCtrl.dismiss(false);
  }

  confirm(){
  	this.viewCtrl.dismiss(true);
  }

}
