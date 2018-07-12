import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { User } from '../../models/users/user.interface';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { SignupPage } from '../signup/signup';
import { WelcomePage } from '../welcome/welcome';
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
  	private afs: AngularFirestore, private storage: LocalDataProvider,
    private errHandler: ErrorHandlerProvider) {
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
  	this.navCtrl.push(SignupPage);
  }

  signin(){
  	this.loading = true;
  	this.afAuth.auth.signInWithEmailAndPassword(this.seeker.email, this.password).then(firebaseUser =>{
      //console.log('firebaseUser: ', firebaseUser);
  		this.afs.collection('Users').doc<User>(`${firebaseUser.user.uid}`).valueChanges().subscribe(data =>{
        //console.log('ClickinnUser: ', data);
  			this.seeker = data;
  			this.storage.setUser(data).then(() =>{
          //console.log('CurrentUser: ', this.seeker)
  				this.navCtrl.setRoot(WelcomePage).then(() => this.loading = false);
  			})
        .catch(err => {
          this.errHandler.handleError(err);
          this.loading = false;
        })
  		}, err =>{
        this.errHandler.handleError(err);
        this.loading = false;
      })
  	})
    .catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  }

}
