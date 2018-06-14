import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Apartment } from '../../models/properties/apartment.interface';
import { DatePicker } from '@ionic-native/date-picker';
import { Calendar } from '@ionic-native/calendar';
import { LocalDataProvider } from '../../providers/local-data/local-data';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker, 
  	private calender: Calendar, private confirmtCtrl: ModalController, private storage: LocalDataProvider,
    private toast: ToastController){	
  }

  ionViewWillLoad(){
    this.storage.getApartment().then(data => this.apartment = data).catch(err => this.handleError(err));
  }

  book(){
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
    })
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
