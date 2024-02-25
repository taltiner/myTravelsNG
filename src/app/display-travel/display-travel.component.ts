import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TravelState } from "../store/travel.state";
import { addTravel } from '../store/travel.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export interface DisplayTravel {
  position: number,
  startDate: string,
  endDate: string,
  activities: string,
  rating: number
}

const travelData: DisplayTravel[] = [
  { position: 1, startDate: '10/2/2024', endDate: '10/5/2024', activities: 'Test', rating: 3 },
  { position: 2, startDate: '8/5/2024', endDate: '8/7/2024', activities: 'Testtt', rating: 4 },
];

@Component({
  selector: 'app-display-travel',
  templateUrl: './display-travel.component.html',
  styleUrl: './display-travel.component.css'
})
export class DisplayTravelComponent {
  displayedColumns: string[] = ['position', 'startDate', 'endDate', 'activities', 'rating'];
  dataSource = travelData;
  travelState$: Observable<TravelState>

  constructor(private store: Store<{ travel: TravelState }>) {
    this.travelState$ = store.select('travel');
  }

  ngOnInit() {
    console.log(this.travelState$);
  }
}
