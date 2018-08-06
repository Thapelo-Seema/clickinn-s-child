import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { AppointmentsProvider } from '../../providers/appointments/appointments';
import { User } from '../../models/users/user.interface';
import { Appointment } from '../../models/appointment.interface';
import { ObjectInitProvider } from '../../providers/object-init/object-init';
import { Observable } from 'rxjs';
import { LocalDataProvider } from '../../providers/local-data/local-data';

@IonicPage()
@Component({
  selector: 'page-bookings',
  templateUrl: 'bookings.html',
})
export class BookingsPage {
  appointments: Observable<Appointment[]>;
  user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, private appt_svc: AppointmentsProvider,
  	private object_init: ObjectInitProvider, private storage: LocalDataProvider){
  	this.user = this.object_init.initializeUser();
  	this.storage.getUser().then(user =>{
  		this.user = user;
  		this.appointments = this.appt_svc.getUserBookings(user.uid);
  	})
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingsPage');
  }

}
