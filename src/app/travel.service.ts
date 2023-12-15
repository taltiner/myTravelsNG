import { Injectable } from '@angular/core';
import { TRAVEL } from './new-travel/new-travel.model';

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  myTravels: TRAVEL[] = [
    new TRAVEL('Germany', 'Berlin', new Date(2023, 11, 16), new Date(2023, 11, 21), ''),
    new TRAVEL('Türkiye', 'Istanbul', new Date(2023, 11, 16), new Date(2023, 11, 21), '')
  ]
  constructor() { }

  getMyTravels() {
    return this.myTravels;
  }

  addNewTravel(newTravel: TRAVEL) {
    this.myTravels.push(newTravel);
  }
}
