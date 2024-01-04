import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TRAVEL } from '../travel.model';
import { TravelService } from '../travel.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-list-travel',
  templateUrl: './list-travel.component.html',
  styleUrl: './list-travel.component.css'
})
export class ListTravelComponent implements OnInit {
  travels: TRAVEL[] = [];
  @Output() deleteIndex = new EventEmitter<string[]>();
  selectedTravelIds: string[] = [];
  i: number;
  arrayIndexDelete: number[] = [];

  constructor(private travelService: TravelService) { }

  ngOnInit() {
    this.travels = this.travelService.getMyTravels();
  }



  deleteTravel() {
    this.travelService.deleteTravel(this.travels, this.arrayIndexDelete);
    this.arrayIndexDelete = [];
  }

  setIds(uuid: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedTravelIds.push(uuid);
    } else {
      const index = this.selectedTravelIds.indexOf(uuid);
      if (index !== -1) {
        this.selectedTravelIds.splice(index, 1);
      }
    }

    for (let emUuid of this.selectedTravelIds) {
      const travelToRemove = this.travels.find(travel => travel.uuid === emUuid);
      if (travelToRemove) {
        this.arrayIndexDelete.push(this.travels.indexOf(travelToRemove));
      }
    }
  }


}
