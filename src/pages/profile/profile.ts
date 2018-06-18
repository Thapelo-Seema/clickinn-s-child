import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { User } from '../../models/users/user.interface';
import { AngularFirestore } from 'angularfire2/firestore';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
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

  user: User;	//the current user
  image: string = "assets/imgs/MyselfMale.png";
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider,
  	 private afs: AngularFirestore, private errHandler: ErrorHandlerProvider){
      this.loading = true;
  		this.storage.getUser().then(data =>{
        this.afs.collection('Users').doc<User>(data.uid).valueChanges().subscribe(user =>{
          this.user = user;
          if(this.user.photoURL !== '') this.image = this.user.photoURL;
          this.loading = false;
        },
        err =>{
          this.errHandler.handleError(err);
          this.loading = false
        })
	  	})
      .catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  	
  }

  gotoEdit(){
    this.navCtrl.push('EditProfilePage');
  }

}
