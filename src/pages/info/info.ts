import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Apartment } from '../../models/properties/apartment.interface';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { Image } from '../../models/image.interface';
import { AccommodationsProvider } from '../../providers/accommodations/accommodations';
import { Duration } from '../../models/location/duration.interface';
import { Address } from '../../models/location/address.interface';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';

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
  	private accom_svc: AccommodationsProvider, private errHandler: ErrorHandlerProvider) {
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
      //console.log('Description: ' + this.pointOfInterest.description + '\n' + 'Name: ' + this.pointOfInterest.name)
    })
    .catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  	this.storage.getApartment().then(data => {
      this.apartment = data;
      if(this.apartment.property.nearbys == undefined || this.apartment.property.nearbys == null || 
        this.apartment.property.nearbys.length == 0 ){
        this.apartment.property.nearbys = [];
      }
      this.images = [];
      this.images = Object.keys(data.images).map(imageId =>{
        return data.images[imageId]
      })
  	})
    .catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  	
 }


}
