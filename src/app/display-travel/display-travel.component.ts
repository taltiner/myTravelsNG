import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TravelState } from "../store/travel.state";
import { addTravel } from '../store/travel.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TravelService } from '../travel.service';

export interface DisplayTravel {
  position: number,
  country: string,
  city: string,
  startDate: string,
  endDate: string,
  activities: string,
  rating: string
}

const travelData: DisplayTravel[] = [
  { position: 1, country: 'Germany', city: 'Nürnberg', startDate: '10/2/2024', endDate: '10/5/2024', activities: 'Test', rating: "3" },
  { position: 2, country: 'Germany', city: 'Berlin', startDate: '8/5/2024', endDate: '8/7/2024', activities: 'Testtt', rating: "4" },
];

@Component({
  selector: 'app-display-travel',
  templateUrl: './display-travel.component.html',
  styleUrl: './display-travel.component.css'
})
export class DisplayTravelComponent implements OnInit {
  displayedColumns: string[] = ['position', 'country', 'city', 'startDate', 'endDate', 'activities', 'rating'];
  dataSource = travelData;
  travelState$: Observable<TravelState[]>
  dataSourceNew: DisplayTravel[] = [];

/*   constructor(private store: Store<{ travel: TravelState }>) {
    this.travelState$ = store.select('travel');
  }

  ngOnInit() {
    console.log(this.travelState$);
  } */

  constructor(private travelService: TravelService) { }

  ngOnInit(): void {
    this.travelState$ = this.travelService.getTravels();
    this.travelState$.subscribe(data => {
      console.log(data);
    });
  }
  }

