import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AlertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html',
})
export class AlertPage {
	warning ={
		title: 'string',
 		message: 'string'
	}
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController){
  }

  ionViewWillLoad(){
  	this.warning = this.navParams.get('data');
  }

  close(){
  	this.viewCtrl.dismiss();
  }

}
