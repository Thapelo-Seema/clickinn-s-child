import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Address } from '../../models/location/address.interface';
import { Search } from '../../models/search.interface';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { AngularFirestore } from 'angularfire2/firestore';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
//import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the PrefferencesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prefferences',
  templateUrl: 'prefferences.html',
})
export class PrefferencesPage {

 private search_object: Search = {
    apartment_type: 'Any',
    nsfas: false,
    parking: false,
    laundry: false,
    wifi: false,
    maxPrice: null,
    minPrice: 0,
    Address: null,
    timeStamp: 0
   };
 
  pointOfInterest: Address ;
  more: boolean = false;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alert: ModalController,  
  	private storage: LocalDataProvider, private afs: AngularFirestore,
    private errHandler: ErrorHandlerProvider) {
  	this.storage.getPOI().then(data => this.pointOfInterest = data)
    .catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  }

  gotoSeekPage(){
    this.loading = true;
     if(this.search_object.maxPrice == 0 || this.search_object.maxPrice == null){
      this.showWarnig(
          'Price limit not set!',
          'Please enter the maximum price.'
        );
      return;
    }
    this.search_object.Address = this.pointOfInterest;
    this.search_object.maxPrice = Number(this.search_object.maxPrice);
    this.search_object.minPrice = Number(this.search_object.minPrice);
    this.search_object.timeStamp = Date.now();
    this.afs.collection('Searches2').add(this.search_object).then(data =>{
      this.loading = false;
    })
    .catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
    this.storage.setSearch(this.search_object).then(data =>{
      this.loading = false;
    	this.navCtrl.push('SeekingPage', {search: this.search_object, poi: this.pointOfInterest});
    })
    .catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  }

  showWarnig(title: string, message: string){
    const myData = {
      title: title,
      message: message
    }
    let warningModal = this.alert.create('AlertPage', {data: myData})
    warningModal.present();
  }

  showMore(){
    this.more = !this.more;
  }


}
