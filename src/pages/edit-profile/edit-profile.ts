import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
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

  user: User = {
      email: '',
      firstname: '',
      lastname: '',
      displayName: '',
      is_host: false,
      user_type: 'seeker',
      uid: '',
      fcm_token: '',
      phoneNumber: '',
      photoURL: '',
      status: false,
      threads: {}
    }	//the current user
  image: string = "assets/imgs/MyselfMale.png";
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider,
  	private toast: ToastController, private afs: AngularFirestore){
    this.loading = true;
  		this.storage.getUser().then(data =>{
	  		this.user = data;
        console.log('User: ', this.user);
	  		if(this.user.photoURL !== '') this.image = this.user.photoURL;
        this.loading = false;
	  }).catch(err => this.handleError(err))
  }

  save(){
    this.loading = true;
    this.afs.collection('Users').doc(this.user.uid).update(this.user).then(() =>{
      this.toast.create({
        message: "Profile successfully updated",
        showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'top',
          cssClass: 'toast_margins full_width'
    }).present().then(() =>{
        this.loading = false;
    })
      
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
