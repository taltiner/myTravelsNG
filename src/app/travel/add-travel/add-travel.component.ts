import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrl: './add-travel.component.css'
})
export class AddTravelComponent {
  @ViewChild('countryInput') country: ElementRef;
  @ViewChild('cityInput') city: ElementRef;
  beginDate = '';
  endDate = '';
  @Output() newTravel = new EventEmitter<{ country: string, city: string, beginDate: string, endDate: string }>();

  emitTravel(beginDateInput: any, endDateInput: any) {
    const formattedBeginDate = new Date(beginDateInput.value).toLocaleDateString('de-DE');
    const formattedEndDate = new Date(endDateInput.value).toLocaleDateString('de-DE');
    this.newTravel.emit({ country: this.country.nativeElement.value, city: this.city.nativeElement.value, beginDate: formattedBeginDate, endDate: formattedEndDate });
  }
}
