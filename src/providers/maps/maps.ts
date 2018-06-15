import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Duration } from '../../models/location/duration.interface';
import { Address } from '../../models/location/address.interface';
import { MarkerOptions } from '../../models/markeroptions.interface';
import { LatLngCoordinates } from '../../models/location/latlng.interface';
//import { Observable } from 'rxjs';
import { Apartment } from '../../models/properties/apartment.interface';
import { App } from 'ionic-angular';
import { LocalDataProvider } from '../../providers/local-data/local-data';

//import { AccommodationsProvider } from '../accommodations/accommodations';

import 'rxjs/add/operator/map';

declare var google: any;
declare var MarkerClusterer: any;
/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapsProvider {

constructor(public geo: Geolocation, 
  private storage: LocalDataProvider, public appCtrl: App){
}

/*gets the walking duration between two points/places given their *Address* objects and returns a promise of a *Duration* object
using the google maps api with its Distance Matrix Service*/
  getWalkingDuration(originObject: Address, destinationObect: Address): Promise<Duration>{
    var originLatLng = new google.maps.LatLng(originObject.lat, originObject.lng)
    var originStr = originObject.description
    var destinationLatLng = new google.maps.LatLng(destinationObect.lat, destinationObect.lng)
    var destinationStr = destinationObect.description
    var service = new google.maps.DistanceMatrixService();
    var durationPromise = new Promise<Duration>((resolve, reject) =>{
    	service.getDistanceMatrix(
	    {
	      origins: [originLatLng, originStr],
	      destinations: [destinationStr, destinationLatLng],
	      travelMode: 'WALKING'
	    }, (response, status) =>{
	      if(status == google.maps.DistanceMatrixStatus.OK){
	        var duration = response.rows[0].elements[0].duration; //initialize duration to the first duration is the results
	        response.rows.forEach(row =>{
	          row.elements.forEach(element => {
	            if(element.duration.value < duration.value) duration = element.duration; //check for a lesser duration
	          })
	        })
          console.log(duration);
	        resolve(duration); //return a duration promise
	      }else{
	      	console.error(status)
	      	reject(status);
	      } 
	    });
    })
    return durationPromise;
  }
/*This function returns an Address Promise given a places lat lng, for the case when the native geolocation service 
just returns the coordintes of a place and we need the details of the place
*/
geoGoder(address: string):Promise<Address>{
  var geocoder = new google.maps.Geocoder;
  return new Promise<Address>((resolve, reject) =>{
    geocoder.geocode({'address': address}, (results, status) =>{
      if(status === 'OK'){
        var place: Address = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          description:  results[0].formatted_address,
          name: results[0].formatted_address,
          vicinity: results[0].formatted_address,
          country_long: '',
          country_short: ''
        }
        results[0].address_components.forEach(comp =>{
          comp.types.forEach(type =>{
            switch (type) {
              case "administrative_area_level_1":
                place.administrative_area_level_1_lng = comp.long_name;
                place.administrative_area_level_1_short = comp.short_name;
                break;
                case "administrative_area_level_2":
                place.administrative_area_level_2_lng = comp.long_name;
                place.administrative_area_level_2_short = comp.short_name;
                break;
              case "country":
                place.country_long = comp.long_name;
                place.country_short = comp.short_name;
                break;
                case "locality":
                place.locality_lng = comp.long_name;
                place.locality_short = comp.short_name;
                break;
                case "sublocality":
                place.sublocality_lng = comp.long_name;
                place.sublocality_short = comp.short_name;
                break;
            }
          })
        })
        resolve(place);
      }
      else {
        console.log('Status: ', status);
        reject(status)
      }

    })
  }) 
}

  reverseGeocoder(lat: number, lng: number): Promise<Address>{
    var geocoder = new google.maps.Geocoder;
    const latlng = {lat: lat, lng: lng};
    var placeInfo = new Promise<Address>((resolve, reject) =>{
        geocoder.geocode({'location': latlng}, (results, status) =>{
            if(status === 'OK'){
              console.log('results: ', results[0])
              var place: Address = {
                lat: lat,
                lng: lng,
                description: results[0].formatted_address,
                name: results[0].name,
                vicinity: results[0].vicinity,
                country_long: 'South Africa',
                country_short: 'ZA'
              }
              results[0].address_components.forEach(comp =>{
          comp.types.forEach(type =>{
            switch (type) {
              case "administrative_area_level_1":
                place.administrative_area_level_1_lng = comp.long_name;
                place.administrative_area_level_1_short = comp.short_name;
                break;
                case "administrative_area_level_2":
                place.administrative_area_level_2_lng = comp.long_name;
                place.administrative_area_level_2_short = comp.short_name;
                break;
              case "country":
                place.country_long = comp.long_name;
                place.country_short = comp.short_name;
                break;
                case "locality":
                place.locality_lng = comp.long_name;
                place.locality_short = comp.short_name;
                break;
                case "sublocality":
                place.sublocality_lng = comp.long_name;
                place.sublocality_short = comp.short_name;
                break;
            }
          })
        })
           resolve(place); 
          } 
          else reject(results);
        })
    })
    return placeInfo; 
  }
/* Initialises a map centered at the position given by lat and lng and renders the map at the DOM element referenced by mapRef
 A reference to the map is also returned*/
  initialiseMap(lat: number, lng: number, mapRef: ElementRef):Promise<any>{
  	const location = new google.maps.LatLng(lat, lng)
  	const options = {
  		center: location,
  		zoom: 15,
  		mapTypeId: 'terrain',
      zoomControl: false,
      mapTypeControl: false,
      streetViewControl: false
  	}
  	var map = new Promise<any>((resolve, reject) =>{
  		resolve(new google.maps.Map(mapRef.nativeElement, options)); 
  	})
  	return map;
  }
/*Adds a marker of the specified  shape or icon as specified by the MarkerOptions. A reference to this marker is returned*/
  addMarker(options: MarkerOptions, price?: number){
  	return new google.maps.Marker({
      position: options.position, 
      map: options.map, 
      title: options.title, 
      icon: options.icon, 
      shape: options.shape,
      label: price ? {
        text: 'R' + price.toString(),
        color: 'black',
        fontSize: '8px',
        fontWeight: 'bold'
    }: null });
  }
/*Returns the LatLng coordinates of the current location of a device(needs some accuracy tweaking)*/
  getCurrentLocation(): Promise<LatLngCoordinates>{
  	 return  new Promise<LatLngCoordinates>((resolve, reject) =>{
  	 	this.geo.getCurrentPosition().then(data =>{
	      resolve({lat: data.coords.latitude, lng: data.coords.longitude}) 
	    }).catch(err => {
	    	reject(err);
	    })
  	 })
  }
/*Returns an array of place predictions from the google place engine, given a textbox event for places in South Africa only*/
  getPlacePredictionsSA(event: any):Promise<any[]>{
    var searchText = event.target.value;
    if(searchText != undefined && searchText != null && searchText.length > 1){
        var service = new google.maps.places.AutocompleteService();
        return new Promise<any>((resolve, reject) =>{
          service.getPlacePredictions({ input: searchText, componentRestrictions: {country: 'za'} }, 
          (predictions, status) =>{
            if (status != google.maps.places.PlacesServiceStatus.OK){
              reject(status);
            }
              resolve(predictions);
          });
        }) 
    }else{
      return new Promise<any>((resolve, reject) =>{
        resolve([]);
      })
    }
  }
/*Returns a places Address object given its place_id*/
  getPlaceById(place_id):Promise<Address>{
    var request = {
        placeId: place_id
      }
   return this.getPlaceDetails(request);
  }
/*Helper function for getPlaceById which queries the googles place service and returns a transformed result of the response from the 
place service*/
   private getPlaceDetails(request):Promise<Address>{
    const pservice = new google.maps.places.PlacesService(document.createElement('div'));
    const detailsPromise = new Promise<Address>((resolve, reject) =>{
        pservice.getDetails(request,(details, status) => { this.transformPlaceToAddress(details, status).then(location =>{
          resolve(location);
        })})
    })
    return detailsPromise; 
  }
/*Helper function for getPlaceDetails Transforms a google places service response into a clickinn address*/
  private transformPlaceToAddress(details, status):Promise<Address>{
    var locationObject = new Promise<Address>((resolve, reject) =>{
      if (status == google.maps.places.PlacesServiceStatus.OK){
        var pointOfInterest: Address = {lat: 0, lng: 0, description: null, name: '', vicinity: '', country_long: '', country_short: ''};
        pointOfInterest.lat = details.geometry.location.lat();
        pointOfInterest.lng = details.geometry.location.lng();
        pointOfInterest.description = details.formatted_address;
        pointOfInterest.name = details.name;
        pointOfInterest.vicinity = details.vicinity;
        details.address_components.forEach(comp =>{
          comp.types.forEach(type =>{
            switch (type) {
              case "administrative_area_level_1":
                pointOfInterest.administrative_area_level_1_lng = comp.long_name;
                pointOfInterest.administrative_area_level_1_short = comp.short_name;
                break;
                case "administrative_area_level_2":
                pointOfInterest.administrative_area_level_2_lng = comp.long_name;
                pointOfInterest.administrative_area_level_2_short = comp.short_name;
                break;
              case "country":
                pointOfInterest.country_long = comp.long_name;
                pointOfInterest.country_short = comp.short_name;
                break;
                case "locality":
                pointOfInterest.locality_lng = comp.long_name;
                pointOfInterest.locality_short = comp.short_name;
                break;
                case "sublocality":
                pointOfInterest.sublocality_lng = comp.long_name;
                pointOfInterest.sublocality_short = comp.short_name;
                break;
            }
          })
        })
        resolve(pointOfInterest)
      }
    })
     return locationObject
  }
/*Returns a promise of an address object of a place selected in a list returned by the google places service*/
  getSelectedPlace(place): Promise<Address>{
    return this.getPlaceById(place.place_id)
  }
/*Initialises and returns markers with click listeners that reveal information about each place*/
addMarkersWithClickListeners(places: Address[], poi: Address, map: any): Array<any>{
 /* const poiLocation = new google.maps.LatLng(poi.lat, poi.lng);
  const poiOptions: MarkerOptions = {position: poiLocation, map,}
  this.addMarker()*/
  if(places.length > 0){
    return places.map(place => {
    const location = new google.maps.LatLng(place.lat, place.lng);
    const markerOptions: MarkerOptions = 
    { position: location, 
      map: map, 
      title: place.description, 
      icon: {url: 'assets/imgs/png/price_tag.png'} 
    }
    var marker = this.addMarker(markerOptions, 5000);
    marker.addListener('click', () =>{
      this.getWalkingDuration(poi, place).then(duration => {
        var card = '<div id="content">' +
                   '<p> This place is <b><em>' + duration.text + 
                   '</em></b> away </p></div>'
        var infoWindow = new google.maps.InfoWindow({
          content: card
        })
        infoWindow.open(map, marker);
      }).then(()=>{

      })
    });
    return marker;
  })
  }else return [] ;
}

addApartmentMarkersWithClickListeners(places: Apartment[], poi: Address, map: any): Array<any>{
  /*const poiLocation = new google.maps.LatLng(poi.lat, poi.lng);
  const poiOptions: MarkerOptions = {position: poiLocation, map,}
  this.addMarker()*/
  if(places.length > 0){
    var flightPlanCoordinates = [
          {lat: places[0].property.address.lat, lng: places[0].property.address.lng},
          {lat: poi.lat, lng: poi.lng}
        ];
        var flightPath = new google.maps.Polyline({
          path: flightPlanCoordinates,
          geodesic: true,
          strokeColor: '#3A86B7',
          strokeOpacity: 1.0,
          strokeWeight: 15
        });

        
    return places.map(place => {
    const location = new google.maps.LatLng(place.property.lat, place.property.lng);
    const markerOptions: MarkerOptions = 
    {
      position: location, 
      map: map, 
      title: place.description, 
      icon: {url: 'assets/imgs/png/price_tag.png'} 
    }
    var marker = this.addMarker(markerOptions, place.price)
    marker.addListener('click', () =>{
      this.getWalkingDuration(poi, place.property.address).then(duration => {
        this.storage.setWalkingDuration(duration).then(data => this.gotoApartment(place).catch(err => console.log(err)))
        .catch(err => console.log(err))
        
      })
    });
    flightPath.setMap(map);
    return marker;
  })
  }else return [] ;
}
/*Initialises and returns markers without event listeners*/
addMarkers(places: Address[], poi: Address, map: any): Array<any>{
  if(places.length > 0){
    return places.map(place => {
    const location = new google.maps.LatLng(place.lat, place.lng);
    const markerOptions: MarkerOptions = {position: location, map: map, title: place.description, icon: '', shape: 'CIRCLE'}
    return this.addMarker(markerOptions); 
  })
  } 
}
/*Displays the details of each place*/
displayPlaceDetails(poi: Address, place: Address){

}

/*Clusters markers based on the zoom level*/
ClusterMarkers(map, markers){
	return new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  })
}

/*Returns an array of place predictions from the google place engine, given a textbox event for places in South Africa only*/
  getPlaceFromAddress(address: string):Promise<any[]>{
    var searchText = address;
    if(searchText != undefined && searchText != null && searchText.length > 1){
        var service = new google.maps.places.AutocompleteService();
        return new Promise<any>((resolve, reject) =>{
          service.getPlacePredictions({ input: searchText, componentRestrictions: {country: 'za'} }, 
          (predictions, status) =>{
            if (status != google.maps.places.PlacesServiceStatus.OK){
              alert(status);
              reject(predictions);
            }
              resolve(predictions);
          });
        }) 
    }else{
      return new Promise<any>((resolve, reject) =>{
        resolve([]);
      })
    }
  }

 /*gotoApartment(apartment: Apartment){
    this.storage.setApartment(apartment).then(data => this.navCtrl.push('ApartmentDetailsPage'));
 }*/

 gotoApartment(apartment: Apartment):Promise<void>{
    return this.storage.setApartment(apartment).then(data => {
      this.appCtrl.getRootNav().push('ApartmentDetailsPage')
    })
 }

}
