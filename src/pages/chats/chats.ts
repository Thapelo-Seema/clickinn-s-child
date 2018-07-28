import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ObjectInitProvider } from '../../providers/object-init/object-init';


@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private object_init: ObjectInitProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }

}
