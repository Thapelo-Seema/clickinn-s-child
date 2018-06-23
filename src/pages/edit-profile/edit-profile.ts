import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { User } from '../../models/users/user.interface';
import { ErrorHandlerProvider } from '../../providers/error-handler/error-handler';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

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
    }	//the current user
  image: any = "assets/imgs/placeholder.png";
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: LocalDataProvider,
  	private toast: ToastController, private afs: AngularFirestore, private errHandler: ErrorHandlerProvider,
    private camera: Camera){
    this.loading = true;
  		this.storage.getUser().then(data =>{
	  		this.user = data;
        console.log('User: ', this.user);
	  		if(this.user.photoURL !== '') this.image = this.user.photoURL;
        else console.log(this.user.photoURL);
        this.loading = false;
	  }).catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  }

  save(){
    this.loading = true;
    this.afs.collection('Users').doc(this.user.uid).update(this.user).then(() =>{
      this.toast.create({
        message: "Profile successfully updated",
        showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'middle',
          cssClass: 'toast_margins full_width'
    }).present().then(() =>{
        this.loading = false;
    })
      
    }).catch(err => {
      this.errHandler.handleError(err);
      this.loading = false;
    })
  }
  //Select or take a picture from the galley
  changeDp(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 2,
      allowEdit: true,
      targetWidth: 800,
      targetHeight: 800,
      
    }

    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.image = 'data:image/jpeg;base64,' + imageData;
    }).catch(err => this.errHandler.handleError({errCode: 'IMAGE_NOT_SELECTED', message: 'No image selected'}))
  }

}