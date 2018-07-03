import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { LocalDataProvider } from '../providers/local-data/local-data';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/users/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';

import 'rxjs/add/operator/take';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;
  loading: boolean = true;
  user: User;
  authState: any;
  online: boolean = false;
  @ViewChild('content') navCtrl;

  //Check network status
    //if connected check authState
      //if authenticated --> sync user data
        //if user tenant -->home
        //else if seeker --> welcome
      //else -->login
    //if not connected
      //if local user object
        //if tenant -->home
        //else if seeker -->welcome
      //else --> login

  constructor(private storage: LocalDataProvider, private afs: AngularFirestore, private afAuth: AngularFireAuth, 
    private platform: Platform, private errHandler: ErrorHandlerProvider){
    this.loading = true;
    //Check for platform readiness before doing anything
    this.platform.ready()
    .then(() =>{
      console.log('platform ready')
      //firestore required setting
      afs.firestore.settings({timestampsInSnapshots: true});
      this.initializeUser(); 
    })
    .then(() => this.monitorAuthState())
    .then(() => this.monitorConnectionState())
    .catch(err =>{
      this.errHandler.handleError(err);
      this.loading = false;
    })
  }
  //Navigate to the users profile
  gotoProfile(){
    this.loading = true;
    this.navCtrl.push('ProfilePage').then(() =>{
      this.loading = false;
    });
  }
  //Change the users authState, remove the users local copy
  logout(){
    this.afAuth.auth.signOut().then(() =>{
      this.navCtrl.setRoot('LoginPage');  
    }) 
  }
  //Navigate to the upload and earn page
  uploadAndEarn(){
    this.navCtrl.push('UploadAndEarnPage');
  }
  //Navigates the user their appropriate homepage at startup
  navigateUser(user: User){
    if(user.user_type){ //check i user_type property exists in user
      switch(user.user_type){
        case 'seeker':{
          //Navigate to welcome page
          this.rootPage = 'WelcomePage';
          break;
        }
        case 'host':{
          //Navigate to host dashboard
          this.rootPage = 'WelcomePage';
          break;
        }
        case 'support':{
          //Navigate to support interface
          this.rootPage = 'WelcomePage';
          break;
        }
        case 'tenant':{
          //Navigate to home
          this.rootPage = 'WelcomePage';
          break;
        }
        case 'Thapelo':{
          //Navigate to master
          this.rootPage = 'WelcomePage';
          break;
        }
      }
    }else{
      //Navigate to welcome page
      this.rootPage = 'WelcomePage';
    }
  }
  //Check for authState and sync user data if possible
  initializeAuthenticatedUser(){
    if(this.afAuth.auth.currentUser){
      this.afs.collection('Users').doc<User>(this.afAuth.auth.currentUser.uid).valueChanges()
      .take(1)
      .subscribe(user =>{
        if(user){
          this.user = user;
          this.storage.setUser(user)
          .then(() =>{
            this.navigateUser(user);
            this.loading = false;
            return;
          })
          .catch(err =>{
            this.errHandler.handleError({errCode: 'SET_OFFLINE_USER', message: `Error persisting offline user`});
            this.loading = false;
            return;
          })
        }
      })
    }
    else{
      this.rootPage = 'LoginPage';
      this.loading = false;
      return;
    }
  }
  //If user device is offline check for a local copy of the user and navigate user apporopriately
  InitializeOfflineUser(){
    this.storage.getUser().then(user =>{
      if(user){
        this.navigateUser(user);
        this.loading = false;
      }
      else{
        this.rootPage = "LoginPage";
        this.loading = false;
        return;
      }
    }).catch(err => {
      this.errHandler.handleError({errCode: 'GET_OFFLINE_USER', message: 'Error initializing offline user'});
      this.loading = false;
      return;
    })
  }

  syncAuthenticatedUser(){
    if(this.afAuth.auth.currentUser){
      this.afs.collection('Users').doc<User>(this.afAuth.auth.currentUser.uid).valueChanges()
      .subscribe(user =>{
        if(user){
          this.user = user;
          this.storage.setUser(user)
          .then(() =>{
            this.loading = false;
            return;
          })
          .catch(err =>{
            this.errHandler.handleError({errCode: 'SET_OFFLINE_USER', message: `Error persisting offline user`});
            this.loading = false;
            return;
          })
        }
      })
    }
  }

  monitorAuthState(){
    this.authState = this.afAuth.authState.subscribe(user =>{
      console.log('MonitorAuthState running....')
      if(user || this.afAuth.auth.currentUser){
        console.log('Firebase user found...')
        if(this.platform.is('cordova')){
          console.log('on mobile device...')
          if(window.navigator.onLine){//If there is a network connection
            console.log('Connected!');
            this.online = true;
            this.initializeAuthenticatedUser();
          }else{
            console.log('offline')
            this.online = false;
            //Atleast check if there's a cached user otherwise only show login page
            this.InitializeOfflineUser();
          }
        }
        else{
          console.log('On browser')
          if(window.navigator.onLine){
            console.log('connected')
            this.online = true;
            this.initializeAuthenticatedUser();
          }else{
            //check for cached otherwise take to login page
            console.log('offline')
            this.online = false;
            this.InitializeOfflineUser();
          }
        }
      }
      else if(user == null){
        this.navCtrl.setRoot('LoginPage');
        this.loading = false;  
      }else{
        this.loading = false;
        console.log('I dunno')
      }
    })
  }
  //Update the offine user data when an internet connection is established
  monitorConnectionState(){
    console.log('MonitorConnectionState running....')
      window.addEventListener('online', () =>{
        this.online = true;
        this.syncAuthenticatedUser();
      })
  }

  initializeUser(){
    this.user ={
    firstname: '',
    lastname: '',
    uid: '',
    user_type: '',
    email: '',
    is_host: false,
    displayName: '',
    fcm_token: '',
    phoneNumber: '',
    photoURL: '',
    rating: '',
    status: false,
    threads: null
  };
  }
}

