import { Injectable } from '@angular/core';
import { TRAVEL } from './travel.model';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class TravelService {
  myTravels: TRAVEL[] = [
    new TRAVEL(uuidv4(), 'Germany', 'Berlin', new Date(2023, 11, 16).toLocaleDateString('de-DE'), new Date(2023, 11, 21).toLocaleDateString('de-DE')),
    new TRAVEL(uuidv4(), 'Türkiye', 'Istanbul', new Date(2023, 11, 16).toLocaleDateString('de-DE'), new Date(2023, 11, 21).toLocaleDateString('de-DE'))
  ]
  constructor() { }

  getMyTravels() {
    return this.myTravels;
  }

  addNewTravel(newTravel: TRAVEL) {
    this.myTravels.push(newTravel);
  }

  deleteTravel(travels, arrayIndexDelete) {
    for (let index of arrayIndexDelete) {
      travels.splice(index, 1);
    }
  }
}
