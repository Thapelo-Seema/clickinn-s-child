import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchfeedPage } from './searchfeed';

@NgModule({
  declarations: [
    SearchfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchfeedPage),
  ],
})
export class SearchfeedPageModule {}
