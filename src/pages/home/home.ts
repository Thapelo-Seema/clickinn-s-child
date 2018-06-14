import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Apartment } from '../../models/properties/apartment.interface';
import { AccommodationsProvider } from '../../providers/accommodations/accommodations';
import { MapsProvider } from '../../providers/maps/maps';
import { Address } from '../../models/location/address.interface';
import { Search } from '../../models/search.interface';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { Seeker } from '../../models/users/seeker.interface'
//import { Observable } from 'rxjs';
//import 'rxjs/add/operator/take';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

 private search_object: Search;
 private featuredApartments: Apartment[];
 
 predictions: any[] = [];
 pointOfInterest: Address;
 dataLoaded: boolean = false;
 more: boolean = false;
 user: Seeker;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider, 
  	private accom_svc: AccommodationsProvider, private map_svc: MapsProvider, private alert: ModalController) {
  	this.storage.getSeeker().then(data => this.user = data);
  }

  ionViewWillLoad(){
  	
  } 
  
  gotoSeekPage(){
  	if(this.pointOfInterest.lat == 0 && this.pointOfInterest.lng == 0){
  		this.showWarnig(
        'Point of interest required!',
        'Please enter the name of your institution or the area where you want us to search.'
        )
  		return;
  	}else if(this.search_object.maxPrice == 0){
      this.showWarnig(
          'Price limit not set!',
          'Please enter the maximum price.'
        );
      return;
    }
    this.search_object.maxPrice = Number(this.search_object.maxPrice);
    this.search_object.minPrice = Number(this.search_object.minPrice);
  	this.search_object.timeStamp = Date.now();
    this.navCtrl.push('SeekingPage', {pointOfInterest: this.pointOfInterest, search: this.search_object});
  }

  gotoProfile(){
    this.navCtrl.push('ProfilePage');
  }
//push signup page on the page stack
  gotoSignup(){
    this.navCtrl.push('SignupPage');
  }

//Goto the detail page of an apartment
  gotoApartment(apartment: Apartment){
  	 this.navCtrl.push('ApartmentDetailsPage', {apartment: apartment});
  }

  getPredictions(event){
  	if(event.key === "Backspace" || event.code === "Backspace"){
      setTimeout(()=>{
        this.map_svc.getPlacePredictionsSA(event).then(data => {
          this.predictions = [];
          this.predictions = data;
        }, err => console.log(err));
      }, 3000)
    }else{
      this.map_svc.getPlacePredictionsSA(event).then(data => {
        this.predictions = [];
        this.predictions = data;
      }, err => console.log(err));
    }
	}

	selectPlace(place){
		this.map_svc.getSelectedPlace(place).then(data => {
			this.pointOfInterest = data;
			console.log(this.pointOfInterest);
			this.search_object.Address = data;
			this.predictions = [];
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
