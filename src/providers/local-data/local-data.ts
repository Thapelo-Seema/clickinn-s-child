import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Search } from '../../models/search.interface';
import { Apartment } from '../../models/properties/apartment.interface';
import { Address } from '../../models/location/address.interface';
import { Seeker } from '../../models/users/seeker.interface';
import { User } from '../../models/users/user.interface'

@Injectable()
export class LocalDataProvider {

  constructor(private storage: Storage) {
   
  }

  setSearch(search: Search):Promise<any>{
  	return this.storage.set('search_object', search)
  }

  getSearch():Promise<Search>{
  	return this.storage.get('search_object')
  }

  setUser(user: User){
    return this.storage.set('user', user);
  }

  getUser(){
    return this.storage.get('user');
  }

  removeUser(){
    return this.storage.remove('user');
  }

  setSeeker(seeker: Seeker){
    return this.storage.set('seeker', seeker);
  }

  getSeeker(){
    return this.storage.get('seeker');
  }

  removeSeeker(){
    return this.storage.remove('seeker');
  }

  setApartment(apartment: Apartment):Promise<any>{
  	return this.storage.set('aoi', apartment);
  }

  getApartment():Promise<Apartment>{
  	return this.storage.get('aoi');
  }

  setPOI(poi: Address):Promise<any>{
  	return this.storage.set('poi', poi);
  }

  getPOI():Promise<Address>{
  	return this.storage.get('poi');
  }

  setWalkingDuration(duration: any):Promise<any>{
    return this.storage.set('walkingDuration', duration);
  }

  getWalkingDuration():Promise<any>{
    return this.storage.get('walkingDuration');
  }

}
