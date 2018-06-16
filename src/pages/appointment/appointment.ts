import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Apartment } from '../../models/properties/apartment.interface';
import { DatePicker } from '@ionic-native/date-picker';
import { Calendar } from '@ionic-native/calendar';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { AngularFirestore } from 'angularfire2/firestore';
//import { AngularFireAuth } from 'angularfire2/auth';
import { Appointment } from '../../models/appointment.interface';
import { User } from '../../models/users/user.interface';


@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})
export class AppointmentPage {
  apartment: Apartment = {
    available: true,
    dP: {name: 'placeholder', path: 'path', progress: 0,url: "assets/imgs/placeholder.jpg"},
    deposit: 0,
    description: 'loading...',
    apart_id: '',
    images: [],
    price: 0,
    prop_id: '',
    room_type: 'loading...',
    type: 'loading...',
    timeStamp: 0
  }
  myDate: Date = null;
  loading: boolean = false;
  appointment: Appointment = {
    booker_id: '',
    prop_id: '',
    apart_id: '',
    date: null,
    timeStamp: 0,
    host_id: ''
  }
  user: User = {
      email: '',
      firstname: '',
      lastname: '',
      displayName: '',
      is_host: false,
      user_type: 'seeker',
      uid: '',
      fcm_token: '',
      phoneNumber: '',
      photoURL: '',
      status: false,
      threads: {}
    };

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker, 
  	private calender: Calendar, private confirmtCtrl: ModalController, private storage: LocalDataProvider,
    private toast: ToastController, private afs: AngularFirestore){	

    this.loading = true;
    this.storage.getApartment().then(data =>{
      this.afs.collection("Apartments").doc<Apartment>(data.apart_id).valueChanges().subscribe(apartment =>{
        this.storage.getUser().then(data => this.user = data).then(() =>{
          this.apartment = apartment;
          this.loading = false;
        })
      },
      err =>{
        this.handleError(err);
      })
      
    }).catch(err => this.handleError(err));
  }

  book(){ 
    this.loading = true;
  	this.promptConfirmation();
  }

  promptConfirmation(){
    const myData = {
      title: "Confirm appointment",
      message: "Please confirm that your viewing appointment details are correct"
    }
    let warningModal = this.confirmtCtrl.create('ConfirmationPage', {data: myData})
    warningModal.present();
    warningModal.onDidDismiss(data =>{
      //This is whwre you persist or cancel the appointment on the database
      if(data == true){
        this.createCalenderEvent();
        this.updateAppointmentVals();
        this.afs.collection('Viewings').add(this.appointment).then(data =>{
            this.toast.create({
                message: "Appointment successfully created",
                showCloseButton: true,
                  closeButtonText: 'Ok',
                  position: 'top',
                  cssClass: 'toast_margins full_width'
            }).present()
            this.loading = false;
        }).catch(err => this.handleError(err))
      }
    })
  }

  updateAppointmentVals(){
    this.appointment.prop_id = this.apartment.prop_id;
    this.appointment.apart_id = this.apartment.apart_id;
    this.appointment.booker_id = this.user.uid;
    this.appointment.host_id = this.apartment.property.user_id;
    this.appointment.date = this.myDate;
    this.appointment.timeStamp = Date.now();
  }

  showDatePicker(): Promise<void>{
  	return this.datePicker.show({
	  date: new Date(),
	  mode: 'datetime',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
	  	console.log('Got date: ', date);
	  	this.myDate = date;
	  }
	).catch(err => this.handleError(err));
  }

  createCalenderEvent(){
  	this.calender.hasReadWritePermission().then(permission =>{
  		this.calender.createEvent('Clickinn Viewing Appointment', 
  		this.apartment.property.vicinity,
  		`You requested to view the ${this.apartment.room_type} at ${this.apartment.property.address.description}, the owner of this apartment will be expecting you.`,
  		new Date(), this.myDate
  		)
  	},
  	denied =>{
  		this.calender.requestReadWritePermission().then(approved =>{
  			 this.calender.createEvent('Clickinn Viewing Appointment', 
	  		this.apartment.property.vicinity,
	  		`You requested to view the ${this.apartment.room_type} at ${this.apartment.property.address.description}, the owner of this apartment will be expecting you.`,
	  		new Date(), this.myDate
	  		)
  		},
  		err =>{
  			this.handleError(err);
  		})
  	}).catch(err => this.handleError(err))
  }

  makeAppointment(){
  	this.showDatePicker().then(() => {
      if(this.myDate) this.createCalenderEvent();
    }).catch(err => this.handleError(err))
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
