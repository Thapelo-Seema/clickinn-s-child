import { Component, ViewChild } from '@angular/core';
import { LocalDataProvider } from '../providers/local-data/local-data';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/users/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;
  loading: boolean = true;
  user: User;
  @ViewChild('content') navCtrl;

  constructor(private storage: LocalDataProvider, private afs: AngularFirestore, private afAuth: AngularFireAuth){
    this.loading = true;
    afs.firestore.settings({timestampsInSnapshots: true});
    this.afAuth.authState.subscribe(authState =>{
      this.storage.getUser().then(data =>{
      console.log('User from root comp: ', data);
      if(data){
        this.afs.collection('Users').doc<User>(data.uid).valueChanges().subscribe(user =>{
          this.user = user;
          this.rootPage = 'WelcomePage';
          this.loading = false;
        },
        err =>{
          console.log(err);
        }) 
      } 
      else{
        this.rootPage = 'LoginPage';
        this.loading = false;
      } 
      
    }).catch(err => console.log(err))
    })
  }

  gotoProfile(){
    this.loading = true;
    this.navCtrl.push('ProfilePage').then(() =>{
      this.loading = false;
    });
  }

  logout(){
    this.afAuth.auth.signOut().then(() =>{
        this.storage.removeUser().then(() => {
          this.navCtrl.setRoot('LoginPage')
        });
    }) 
  }
}

