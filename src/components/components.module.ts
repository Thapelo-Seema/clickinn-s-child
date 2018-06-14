import { NgModule } from '@angular/core';
import { ClickinnMapsComponent } from './clickinn-maps/clickinn-maps';
import { FormsModule } from '@angular/forms';
import { AccommodationsComponent } from './accommodations/accommodations';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [ClickinnMapsComponent,
    AccommodationsComponent],
	imports: [FormsModule, IonicModule, CommonModule],
	exports: [ClickinnMapsComponent,
    AccommodationsComponent]
})
export class ComponentsModule {}
