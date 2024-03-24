import { FormControl, FormGroup } from "@angular/forms";
import { createReducer, on } from "@ngrx/store";
import { addTravel } from "./travel.actions";
import { TravelState } from "./travel.state";
import { TravelService } from "../travel.service";
import { Observable, catchError, map, of } from "rxjs";

/* const initialTravel = new FormGroup({
    'startDate': new FormControl('2024-08-05'),
    'endDate': new FormControl('2024-08-10'),
    'country': new FormControl('test'),
    'city': new FormControl('test'),
    'activities': new FormControl('test'),
    'comment': new FormControl('test'),
    'rating': new FormGroup({
        'rating': new FormControl(4)
    })
}); */

const initialState: TravelState = {
    id: '2',
    startDate: '2024-08-05',
    endDate: '2024-08-07',
    country: 'Germany',
    city: 'Köln',
    activities: 'Test',
    comment: 'Test',
    rating: { rating: '4'}
};

export const travelReducer = createReducer(
    initialState,
    on(addTravel, (state, action) => ({
        ...state,
        ...action.travel
    }))

);

export function loadInitialState(travelService: TravelService): Observable<TravelState> {
    return travelService.getTravels().pipe(
        catchError(() => of([])), // Handle errors
        map(travels => {
            // Use the first travel state from the list, or create a default state if the list is empty
            return travels.length > 0 ? travels[0] : getDefaultTravelState();
        })
    );
}

function getDefaultTravelState(): TravelState {
    return {
        id: '',
        startDate: '', // Hier deine Standardwerte für startDate, endDate, usw. einfügen
        endDate: '',
        country: '',
        city: '',
        activities: '',
        comment: '',
        rating: {rating: ''}
    };
}