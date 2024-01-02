import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TRAVEL } from '../travel.model';
import { TravelService } from '../travel.service'
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrl: './add-travel.component.css'
})
export class AddTravelComponent implements OnInit {
  @ViewChild('countryInput') country: ElementRef;
  @ViewChild('cityInput') city: ElementRef;
  beginDate = '';
  endDate = '';

  constructor(private travelService: TravelService) { }
  ngOnInit() {

  }

  emitTravel(beginDateInput: any, endDateInput: any) {
    const formattedBeginDate = new Date(beginDateInput.value).toLocaleDateString('de-DE');
    const formattedEndDate = new Date(endDateInput.value).toLocaleDateString('de-DE');
    let newTravel = new TRAVEL(uuidv4(), this.country.nativeElement.value, this.city.nativeElement.value, formattedBeginDate, formattedEndDate);
    this.travelService.addNewTravel(newTravel);
  }
}
