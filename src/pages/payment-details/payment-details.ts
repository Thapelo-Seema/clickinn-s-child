import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { User } from '../../models/users/user.interface';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { AlertPage } from '../alert/alert';

/**
 * Generated class for the PaymentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-details',
  templateUrl: 'payment-details.html',
})
export class PaymentDetailsPage {

  bank: string = '';
  payment_method: string = '';
  myDate: Date = null;
  refference: string = '';
  seeker: User ;
  loading: boolean = false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker,
   private alert: ModalController, private storage: LocalDataProvider, private toast: ToastController) {
  	this.payment_method = this.navParams.get('payment_method');
    this.storage.getUser().then(data => this.seeker = data).catch(err => this.handleError(err));
  }

  showDatePicker(): Promise<void>{
  	return this.datePicker.show({
	  date: new Date(),
	  mode: 'date',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
	  	console.log('Got date: ', date);
	  	this.myDate = date;
	  })
    .catch(err => this.handleError(err))
  }

  generateRef(){
    if(this.seeker) this.refference =  this.seeker.uid;
  }

  pay(){

  }

  showWarnig(title: string, message: string){
    const myData = {
      title: title,
      message: message
    }
    let warningModal = this.alert.create(AlertPage, {data: myData})
    warningModal.present();
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
