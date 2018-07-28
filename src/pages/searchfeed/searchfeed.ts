import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ObjectInitProvider } from '../../providers/object-init/object-init';
import { SearchfeedProvider } from '../../providers/searchfeed/searchfeed';
import { Observable } from 'rxjs';
import { Search } from '../../models/search.interface';

@IonicPage()
@Component({
  selector: 'page-searchfeed',
  templateUrl: 'searchfeed.html',
})
export class SearchfeedPage {

  searches: Observable<Search[]>;
  search: Search;
  constructor(public navCtrl: NavController, public navParams: NavParams, private object_init: ObjectInitProvider,
  	private searchfeed_svc: SearchfeedProvider){
  	this.searches = this.searchfeed_svc.getAllSearches();
  	this.search = this.object_init.initializeSearch();
  }


  ionViewDidLoad() {
   // console.log('ionViewDidLoad SearchfeedPage');
  }

}
