//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Search } from '../../models/search.interface';
import { Address } from '../../models/location/address.interface';
import { Duration } from '../../models/location/duration.interface';
import { LatLngCoordinates } from '../../models/location/latlng.interface';
import { Location } from '../../models/location/location.interface';
import { Apartment } from '../../models/properties/apartment.interface';
import { Property } from '../../models/properties/property.interface';
import { User } from '../../models/users/user.interface';
import { Tenant } from '../../models/users/tenant.interface';
import { Seeker } from '../../models/users/seeker.interface';
import { Appointment } from '../../models/appointment.interface';
import { FileUpload } from '../../models/file-upload.interface';
import { Image } from '../../models/image.interface';
import { MarkerOptions } from '../../models/markeroptions.interface';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ObjectInitProvider {

  uid: string = '';
  constructor(private afAuth: AngularFireAuth){
    if(this.afAuth.auth.currentUser){
        this.uid = this.afAuth.auth.currentUser.uid;
    }
    
  }

  initializeSearch(): Search{
  	let search: Search = {
  		apartment_type: 'Any',
	    nsfas: false,
	    parking: false,
	    laundry: false,
	    wifi: false,
	    maxPrice: 0,
	    minPrice: 0,
	    Address: this.initializeAddress(),
	    timeStamp: 0,
	    searcher_id: this.uid,
	    searcher_name: '',
	    nearby: '',
	    other: false

  	}
  	return search;
  }


  initializeAddress(): Address{
  	let address: Address = {
  		administrative_area_level_1_lng: '',
  		administrative_area_level_2_lng: '',
  		administrative_area_level_1_short: '',
  		administrative_area_level_2_short: '',
  		country_long: '',
  		country_short: '',
  		description: '',
  		lat: 0,
  		lng: 0,
  		locality_short: '',
  		locality_lng: '',
  		name: '',
  		sublocality_short: '',
  		sublocality_lng: '',
  		vicinity: ''
  	}
  	return address;
  }

  initializeDuration(): Duration{
  	let duration: Duration ={
  		text: '',
  		value: 0
  	}
  	return duration;
  }

  initializeLatLng(): LatLngCoordinates{
  	let latlng: LatLngCoordinates = {
  		lat: 0,
  		lng: 0
  	}
  	return latlng;
  }

  initializeLocation(): Location{
  	let location: Location ={
  		lat: 0,
  		lng: 0,
  		details: ''
  	}
  	return location;
  }

  initializeApartment(): Apartment{
  	let apartment: Apartment ={
  		available: true,
  		dP: this.initializeImage(),
  		deposit: 0,
  		description: '',
  		apart_id: '',
  		images: [this.initializeImage()],
  		occupiedBy: this.initializeTenant(),
  		price: 0,
  		prop_id: '',
  		property: this.initializeProperty(),
  		room_type: '',
  		search_rating: 0,
  		type: '',
  		timeStamp: 0
  	}
  	return apartment;
  }

  initializeImage(): Image{
  	let image: Image = {
  		name: '',
  		path: '',
  		progress: 0,
  		url: ''
  	}
  	return image;
  }

  initializeProperty(): Property{
  	let property: Property = {
  		address: this.initializeAddress(),
  		prop_id: '',
  		common: '',
  		dP: this.initializeImage(),
  		images: [this.initializeImage()],
  		laundry: false,
  		nsfas: false,
  		wifi: false,
  		parking: false,
  		prepaid_elec: false,
  		timeStamp: 0,
  		user_id: '',
  		nearbys: ['Clickinn Offices']
  	}
  	return property;
  }

  initializeUser(): User{
  	let user: User = {
  		displayName: '',
  		firstname: '',
  		lastname: '',
  		user_type: '',
  		email: '',
  		fcm_token: '',
  		is_host: false,
  		phoneNumber: '',
  		photoURL: '',
  		rating: '1',
  		status: false,
  		threads: [''],
  		uid: this.uid,
  		occupation: '',
  		age: 0,
  		dob: new Date(),
  		id_no: '',
  		gender: ''
  	}
  	return user;
  }


 initializeSeeker(): Seeker{
 	let seeker: Seeker = {
 		firstname: '',
 		lastname: '',
 		uid: this.uid,
 		age: 0,
 		occupation: '',
 		cellphone: '',
 		email: '',
 		rating: 0
 	}
 	return seeker;
 }

 initializeTenant(): Tenant{
 	let tenant: Tenant = {
 		profile: this.initializeUser(),
 		address: this.initializeAddress(),
 		reviews: [{comment:'', reviewer_id: '', reviewer_name: ''}]
 	}
 	return tenant;
 }

 initializeAppointment(): Appointment{
 	let appointment: Appointment ={
 		date: new Date(),
 		booker_id: this.uid,
 		prop_id: '',
 		apart_id: '',
 		host_id: '',
 		host_confirms: false,
 		host_declines: false,
 		seeker_cancels: false,
 		timeStamp: 0,
 		address: '',
 		room_type: ''
 	}
 	return appointment;
 }

 initializeFileUpload(): FileUpload{
 	let fileUpload: FileUpload ={
 		file: '',
 		url: '',
 		name: '',
 		progress: 0,
 		path: ''
 	}
 	return fileUpload;
 }
 
 initializeMarkerOptions(): MarkerOptions{
 	let options: MarkerOptions ={
 		position: this.initializeLatLng(),
 		title: '',
 		icon: null,
 		label: null,
 		map: null
 	}
 	return options;
 }
 

}
