import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { User } from '../../models/users/user.interface';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  seeker: User = {
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
    }
  password: string = '';
  loading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth,
  	private afs: AngularFirestore, private storage: LocalDataProvider, private toast: ToastController) {
  	this.seeker = {
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
    }
  }


  signup(){
  	this.navCtrl.push('SignupPage');
  }

  signin(){
  	this.loading = true;
  	this.afAuth.auth.signInWithEmailAndPassword(this.seeker.email, this.password).then(firebaseUser =>{
  		this.afs.collection('Users').doc<User>(`${firebaseUser.uid}`).valueChanges().subscribe(data =>{
        console.log(data);
  			this.seeker = {
  				email: data.email,
  				firstname: data.displayName,
          displayName: data.displayName,
  				lastname: data.lastname,
  				phoneNumber: data.phoneNumber,
  				uid: data.uid,
          is_host: data.is_host,
          user_type: data.user_type,
          fcm_token: data.fcm_token,
          photoURL: data.photoURL,
          status: data.status,
          threads: data.threads
        }
  			this.storage.setUser(this.seeker).then(() =>{
          console.log('CurrentUser: ', this.seeker)
  				this.navCtrl.setRoot('WelcomePage').then(() => this.loading = false);
  			}).catch(err => this.handleError(err))
  		}, err =>{
        this.handleError(err);
      })
  	}).catch(err => {
  		this.handleError(err)
  	})
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
