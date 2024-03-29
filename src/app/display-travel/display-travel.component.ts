import { Component, OnInit } from '@angular/core';
import { TravelState } from "../store/travel.state";
import { Observable } from 'rxjs';
import { TravelService } from '../travel.service';


@Component({
  selector: 'app-display-travel',
  templateUrl: './display-travel.component.html',
  styleUrl: './display-travel.component.css'
})
export class DisplayTravelComponent implements OnInit {
  displayedColumns: string[] = ['position', 'country', 'city', 'startDate', 'endDate', 'activities', 'rating'];
  dataSource: TravelState[];
  travelState$: Observable<TravelState[]>


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
      this.dataSource = data;
    });
  }
  }

