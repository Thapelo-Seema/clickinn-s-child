import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Address } from '../../models/location/address.interface';
import { Apartment } from '../../models/properties/apartment.interface';
import { AccommodationsProvider } from '../../providers/accommodations/accommodations';
import { Search } from '../../models/search.interface';
import { LocalDataProvider } from '../../providers/local-data/local-data';

@IonicPage()
@Component({
  selector: 'page-seeking',
  templateUrl: 'seeking.html',
})
export class SeekingPage {

  pointOfInterest: Address;
  apartments: Apartment[] = [];
  numberOfApartments: number = 0;
  search_object: Search;
  dataLoaded: boolean = false;
  showList: boolean = false;
  more: boolean = false;
  bestMatch: Apartment ;


  constructor(public navCtrl: NavController, public navParams: NavParams, private accom_svc: AccommodationsProvider,
   private alertCtrl: AlertController, private storage: LocalDataProvider, private toast: ToastController){ 
    this.storage.getPOI().then(data =>{
      this.pointOfInterest = data;
    })
    .then(() =>{
      this.storage.getSearch()
      .then(data => {
        console.log(data)
        this.search_object = data;
      }).then(() =>{
        this.getApartments(this.search_object);
      })
      .catch(err => this.handleError(err));
    })
    .catch(err => this.handleError(err))	
  }

  getApartments(obj: Search){
    var ratedArray: Apartment[] = [];
    this.accom_svc.search(obj).subscribe(apartments =>{
      ratedArray = apartments;
      this.numberOfApartments = apartments.length;
      if(ratedArray.length > 0){
        var ind = 0;
        ratedArray.forEach(apartment => {
          ratedArray[ind].search_rating = this.calcRating(apartment);
          ++ind;
        });
        var tempRatedApart = ratedArray[0];
        for(var i = 1; i < ratedArray.length; ++i){
          if(ratedArray[i].search_rating > ratedArray[i].search_rating[i-1]){
            tempRatedApart = ratedArray[i-1];
            ratedArray[i-1] = ratedArray[i];
            ratedArray[i] = tempRatedApart;
          }
        }
        this.bestMatch = ratedArray[0];
        ratedArray.splice(0, 1);
        this.apartments = ratedArray;
        this.showAlert();
        this.dataLoaded = true;
      }
    },
    err =>{
      this.handleError(err);
    })
	}

	gotoApartment(apartment: Apartment){
    this.storage.setApartment(apartment).then(data => this.navCtrl.push('ApartmentDetailsPage')).catch(err => this.handleError(err));
  }

  toggleList(){
    this.showList = !this.showList;
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title:    'Best Matched Apartment!',
      subTitle: ` ${this.bestMatch.room_type} in ${this.bestMatch.property.address.sublocality_lng}, \n 
                   monthly rental of R${this.bestMatch.price}.`,
      message: `Follow the blue line on the map to this apartment and click on apartment price-tag to view more about it or
      or click the list icon to see the list view`,
      cssClass: 'alertCtrl'  ,
      buttons: ['OK']
    });
    alert.present();
  }

  calcRating(apartment: Apartment): number{
    var rating = 0;
    if(apartment.property.nearbys != undefined){
      rating += apartment.property.nearbys.length/100
      if(apartment.property.nearbys.indexOf(this.search_object.Address) != -1) rating+=2;
    }
    if(apartment.property.wifi) rating +=1;
    if(apartment.property.laundry) rating +=1;
    rating += 40*((this.search_object.maxPrice - apartment.price)/this.search_object.maxPrice);
    return rating;
  }

  toggleMore(){
    this.more = !this.more;
  }

  handleError(err){
    console.log(err.message);
      this.dataLoaded = true;
      this.toast.create({
        message: err.message,
        showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'top',
          cssClass: 'toast_margins full_width'
    }).present()
  }

}
