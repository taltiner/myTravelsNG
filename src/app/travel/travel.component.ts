import { Component, OnInit } from '@angular/core';
import { TRAVEL } from './travel.model';
import { v4 as uuidv4 } from 'uuid';
import { TravelService } from './travel.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.css'
})
export class TravelComponent implements OnInit {
  travels: TRAVEL[] = [];
  i: number;
  arrayIndexDelete: number[] = [];

  constructor(private travelService: TravelService) { }

  ngOnInit() {
    this.travels = this.travelService.getMyTravels();
  }


  saveDeleteIndex(dataEmitted) {
    for (let emUuid of dataEmitted) {
      const travelToRemove = this.travels.find(travel => travel.uuid === emUuid);
      if (travelToRemove) {
        this.arrayIndexDelete.push(this.travels.indexOf(travelToRemove));
      }
    }
  }

  deleteTravel() {
    this.travelService.deleteTravel(this.travels, this.arrayIndexDelete);
    this.arrayIndexDelete = [];
  }
}
