//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../../models/location/address.interface';
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
//import { MapsProvider } from '../maps/maps';
import { Property } from '../../models/properties/property.interface';
import { Apartment } from '../../models/properties/apartment.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Search } from '../../models/search.interface';
import { Image } from '../../models/image.interface';
import { User } from '../../models/users/user.interface';
import { Appointment } from '../../models/appointment.interface';
'rxjs/add/operator/merge';

@Injectable()
export class AppointmentsProvider {
  appointment: Appointment;
  constructor(private afstorage: AngularFirestore) {
    
  }

  getUserBookings(uid: string): Observable<Appointment[]>{
  	return this.afstorage.collection<Appointment>('Viewings', ref => ref.where('host_id', '==', uid)).valueChanges()
  	.merge(
  		this.afstorage.collection<Appointment>('Viewings', ref => ref.where('booker_id', '==', uid)).valueChanges()
  	)
  }

  getHostBookings(uid: string): Observable<Appointment[]>{
  	return this.afstorage.collection<Appointment>('Viewings', ref => ref.where('host_id', '==', uid)).valueChanges()
  }

}
