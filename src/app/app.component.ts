import { Component } from '@angular/core';
import { LocalDataProvider } from '../providers/local-data/local-data';
import { AngularFirestore } from 'angularfire2/firestore';

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;
  loading: boolean = true;

  constructor(private storage: LocalDataProvider, private afs: AngularFirestore){
    afs.firestore.settings({timestampsInSnapshots: true});
    this.storage.getUser().then(data =>{
    	if(data) this.rootPage = 'WelcomePage';
    	else this.rootPage = 'LoginPage';
      this.loading = false;
    })
  }
}

