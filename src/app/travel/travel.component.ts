import { Component } from '@angular/core';
import { TRAVEL } from './travel.model';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.css'
})
export class TravelComponent {
  travels: TRAVEL[] = [];
  i: number;
  arrayIndexDelete: number[] = [];

  addNewTravel(emittedData: { country: string, city: string, beginDate: string, endDate: string }) {
    console.log('travel length' + this.travels.length);
    this.i = this.travels.length;
    this.travels.push({ uuid: uuidv4(), country: emittedData.country, city: emittedData.city, beginDate: emittedData.beginDate, endDate: emittedData.endDate });
    console.log(JSON.stringify(this.travels));
  }

  saveDeleteIndex(dataEmitted) {
    console.log('savaDeleteIndex ' + JSON.stringify(dataEmitted));
    for (let emUuid of dataEmitted) {
      const travelToRemove = this.travels.find(travel => travel.uuid === emUuid);
      console.log('travelToRemove = ' + JSON.stringify(travelToRemove));
      if (travelToRemove) {
        this.arrayIndexDelete.push(this.travels.indexOf(travelToRemove));
      }
    }
  }

  deleteTravel() {
    for (let index of this.arrayIndexDelete) {
      console.log('delete Travel index ' + index);
      this.travels.splice(index, 1);
      console.log('rest travels ' + JSON.stringify(this.travels));
    }
    this.arrayIndexDelete = [];
  }
}
