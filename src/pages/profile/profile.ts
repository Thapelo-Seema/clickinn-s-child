import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { User } from '../../models/users/user.interface';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;	

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider,
  	private toast: ToastController, private platform: Platform){
  	this.platform.ready().then(() =>{
  		this.storage.getSeeker().then(data =>{
	  		this.user = data;
	  	})
  	})
  	
  }

  ionViewDidLoad() {
  }

}
