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

  uid: string;
  constructor(private afAuth: AngularFireAuth){
    this.uid = this.afAuth.auth.currentUser.uid;
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
	    searcher_name: 'not provided',
	    nearby: 'not provided',
	    other: false

  	}
  	return search;
  }


  initializeAddress(): Address{
  	let address: Address = {
  		administrative_area_level_1_lng: 'not provided',
  		administrative_area_level_2_lng: 'not provided',
  		administrative_area_level_1_short: 'not provided',
  		administrative_area_level_2_short: 'not provided',
  		country_long: 'not provided',
  		country_short: 'not provided',
  		description: 'not provided',
  		lat: 0,
  		lng: 0,
  		locality_short: 'not provided',
  		locality_lng: 'not provided',
  		name: 'not provided',
  		sublocality_short: 'not provided',
  		sublocality_lng: 'not provided',
  		vicinity: 'not provided'
  	}
  	return address;
  }

  initializeDuration(): Duration{
  	let duration: Duration ={
  		text: 'not provided',
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
  		details: 'not provided'
  	}
  	return location;
  }

  initializeApartment(): Apartment{
  	let apartment: Apartment ={
  		available: true,
  		dP: this.initializeImage(),
  		deposit: 0,
  		description: 'not provided',
  		apart_id: 'not provided',
  		images: [this.initializeImage()],
  		occupiedBy: this.initializeTenant(),
  		price: 0,
  		prop_id: 'not provided',
  		property: this.initializeProperty(),
  		room_type: 'not provided',
  		search_rating: 0,
  		type: 'not provided',
  		timeStamp: 0
  	}
  	return apartment;
  }

  initializeImage(): Image{
  	let image: Image = {
  		name: 'not provided',
  		path: 'not provided',
  		progress: 0,
  		url: 'not provided'
  	}
  	return image;
  }

  initializeProperty(): Property{
  	let property: Property = {
  		address: this.initializeAddress(),
  		prop_id: 'not provided',
  		common: 'not provided',
  		dP: this.initializeImage(),
  		images: [this.initializeImage()],
  		laundry: false,
  		nsfas: false,
  		wifi: false,
  		parking: false,
  		prepaid_elec: false,
  		timeStamp: 0,
  		user_id: 'not provided',
  		nearbys: ['Clickinn Offices']
  	}
  	return property;
  }

  initializeUser(): User{
  	let user: User = {
  		displayName: 'not provided',
  		firstname: 'not provided',
  		lastname: 'not provided',
  		user_type: 'not provided',
  		email: 'not provided',
  		fcm_token: 'not provided',
  		is_host: false,
  		phoneNumber: 'not provided',
  		photoURL: 'not provided',
  		rating: '1',
  		status: false,
  		threads: ['not provided'],
  		uid: this.uid,
  		occupation: 'not provided',
  		age: 0,
  		dob: new Date(),
  		id_no: 'not provided',
  		gender: 'not provided'
  	}
  	return user;
  }


 initializeSeeker(): Seeker{
 	let seeker: Seeker = {
 		firstname: 'not provided',
 		lastname: 'not provided',
 		uid: this.uid,
 		age: 0,
 		occupation: 'not provided',
 		cellphone: 'not provided',
 		email: 'not provided',
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
 		prop_id: 'not provided',
 		apart_id: 'not provided',
 		host_id: 'not provided',
 		host_confirms: false,
 		host_declines: false,
 		seeker_cancels: false,
 		timeStamp: 0,
 		address: 'not provided',
 		room_type: 'not provided'
 	}
 	return appointment;
 }

 initializeFileUpload(): FileUpload{
 	let fileUpload: FileUpload ={
 		file: 'not provided',
 		url: 'not provided',
 		name: 'not provided',
 		progress: 0,
 		path: 'not provided'
 	}
 	return fileUpload;
 }
 
 initializeMarkerOptions(): MarkerOptions{
 	let options: MarkerOptions ={
 		position: this.initializeLatLng(),
 		title: 'not provided',
 		icon: null,
 		label: null,
 		map: null
 	}
 	return options;
 }
 

}
