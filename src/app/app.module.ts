import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation'
import { Calendar } from '@ionic-native/calendar';
import { DatePicker } from '@ionic-native/date-picker';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MyApp } from './app.component';
import { MapsProvider } from '../providers/maps/maps';
import { AccommodationsProvider } from '../providers/accommodations/accommodations';
import { IonicStorageModule } from '@ionic/storage'
import { LocalDataProvider } from '../providers/local-data/local-data';
import { IonicImageViewerModule } from 'ionic-img-viewer';


export const firebaseConfig = {
    apiKey: "AIzaSyDT6HDi-pzKJDKGIUmBqz75ti-SMVzt0tY",
    authDomain: "clickinn-996f0.firebaseapp.com",
    databaseURL: "https://clickinn-996f0.firebaseio.com",
    projectId: "clickinn-996f0",
    storageBucket: "clickinn-996f0.appspot.com",
    messagingSenderId: "882290923419"
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    AngularFirestoreModule, 
    HttpClientModule,
    IonicStorageModule.forRoot(), 
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
   Geolocation, Calendar, DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapsProvider, 
    AccommodationsProvider,
    LocalDataProvider
  ]
})
export class AppModule {}
