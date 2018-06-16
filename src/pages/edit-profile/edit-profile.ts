import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { User } from '../../models/users/user.interface';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user: User;	//the current user
  image: string = "assets/imgs/MyselfMale.png";
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider,
  	private toast: ToastController, private platform: Platform){
  	this.platform.ready().then(() =>{
  		this.storage.getUser().then(data =>{
	  		this.user = data;
	  		if(user.photoURL !== '') this.image = user.photoURL;
	  	}).catch(err => this.handleError(err))
  	}).catch(err => this.handleError(err))
  }

  handleError(err){
    console.log(err.message);
      this.loading = false;
      this.toast.create({
        message: err.message,
        showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'top',
          cssClass: 'toast_margins full_width'
    }).present()
  }

}
