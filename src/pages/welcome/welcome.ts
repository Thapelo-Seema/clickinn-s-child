import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import { Address } from '../../models/location/address.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { User } from '../../models/users/user.interface';
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  predictions: any[] = [];
  pointOfInterest: Address = {
     lat: 0,
     lng: 0,
     description: '',
     country_long: '',
     country_short: ''
  };
  user: User;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider,
  private map_svc: MapsProvider, private alert: ModalController, private afAuth: AngularFireAuth, 
  private toast: ToastController, private afs: AngularFirestore){
    this.loading = true;
    this.storage.getUser().then(data =>{
        this.afs.collection('Users').doc<User>(data.uid).valueChanges().subscribe(user =>{
          this.user = user;
          this.loading = false;
        }, 
        err =>{
          this.handleError(err)
        })
        
      }).catch(err =>{
        this.handleError(err);
    })
    
    
  }

/*Navigating to the next page, which is the PrefferencesPage and passing the pointOfInterest object along*/
  nextPage(){if(this.pointOfInterest.lat == 0 && this.pointOfInterest.lng == 0){
      this.showWarnig(
        'Point of interest required!',
        'Please enter the name of your institution or the area where you want us to search.'
        )
      return;
    }
    this.storage.setPOI(this.pointOfInterest).then(data =>{
      this.navCtrl.push('PrefferencesPage');
    }).catch(err => console.log(err));
  }

  /*Getting autocomplete predictions from the google maps place predictions service*/
  getPredictions(event){
    this.loading = true;
    if(event.key === "Backspace" || event.code === "Backspace"){
      setTimeout(()=>{
        this.map_svc.getPlacePredictionsSA(event).then(data => {
          this.predictions = [];
          this.predictions = data;
        }, err => console.log(err));
      }, 3000)
    }else{
      this.map_svc.getPlacePredictionsSA(event).then(data => {
        this.predictions = [];
        this.predictions = data;
      }).catch(err => this.handleError(err));
    }
  }

  selectPlace(place){
    this.loading = true;
    this.map_svc.getSelectedPlace(place).then(data => {
      this.pointOfInterest = data;
      this.predictions = []
    }).then(()=>{
      this.loading = false;
    }).catch(err =>{
        this.handleError(err);
    })
  }

  showWarnig(title: string, message: string){
    const myData = {
      title: title,
      message: message
    }
    let warningModal = this.alert.create('AlertPage', {data: myData})
    warningModal.present();
  }

  

  handleError(err){
    console.log(err.message);
      this.loading = false;
      this.toast.create({
        message: err.message,
        showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'top',
          cssClass: 'toast_margins full_width'
    }).present()
  }

  

  returnFirst(input: string): string{
    if(input == undefined) return '';
    return input.split(" ")[0];
  }

}
