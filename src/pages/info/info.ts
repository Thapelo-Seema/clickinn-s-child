import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Apartment } from '../../models/properties/apartment.interface';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { Image } from '../../models/image.interface';
import { AccommodationsProvider } from '../../providers/accommodations/accommodations';
import { Duration } from '../../models/location/duration.interface';
import { Address } from '../../models/location/address.interface';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  apartment: Apartment = {
    available: true,
    dP: {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
    deposit: 0,
    description: 'loading...',
    apart_id: '',
    images: [
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"}
    ],
    price: 0,
    prop_id: '',
    room_type: 'loading...',
    type: 'loading...',
    timeStamp: 0
  }
  walkingDuration: Duration;
  adjustedDuration: number = 0;
  pointOfInterest: Address = null;
  images: Image[] = [];
  loading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider, 
  	private accom_svc: AccommodationsProvider, private toast: ToastController) {
    this.images = [
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
      {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"}
      ];
  }

  ionViewWillLoad(){
    this.storage.getPOI().then(data => {
      this.pointOfInterest = data;
      console.log('Description: ' + this.pointOfInterest.description + '\n' + 'Name: ' + this.pointOfInterest.name)
    }).catch(err => this.handleError(err));

    this.storage.getWalkingDuration().then(data => {
      console.log(data);
      this.walkingDuration = data;
      this.adjustedDuration = (Math.floor(this.walkingDuration.value/60));
      if(this.adjustedDuration >= 10) this.adjustedDuration -= 3; 
    }).catch(err => this.handleError(err));
  	this.storage.getApartment().then(data => {
      this.apartment = data;
      this.images = [];
      this.images = Object.keys(data.images).map(imageId =>{
        return data.images[imageId]
      })
      console.log(this.images);
      /*this.apartment.images = pics;
  		this.images = pics;*/
  	}).catch(err => this.handleError(err));
  	
 }

 handleError(err){
    console.log(err.message);
      this.loading = true;
      this.toast.create({
        message: err.message,
        showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'top',
          cssClass: 'toast_margins full_width'
    }).present()
  }

}
