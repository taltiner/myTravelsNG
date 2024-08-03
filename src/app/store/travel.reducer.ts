import { FormControl, FormGroup } from "@angular/forms";
import { MemoizedSelector, createReducer, createSelector, on } from "@ngrx/store";
import { addTravel, navigateToTravel } from "./travel.actions";
//import { TravelState } from "./travel.state";
import { TravelService } from "../travel.service";
import { Observable, catchError, map, of } from "rxjs";
import { Travel } from "../model/travel";

export interface TravelState {
    selectedTravel: Travel
}

const initialSelectedTravel: Travel = {
    id: '',
    startDate: '',
    endDate: '',
    country: '',
    city: '',
    activities: '',
    comment: '',
    rating: ''
};

export const initialTravelState: TravelState = {
    selectedTravel: initialSelectedTravel
}

export const travelReducer = createReducer(
    initialTravelState,
    on(addTravel, (state, action) => ({
        ...state,
        selectedTravel: action.travel
    })),
    on(navigateToTravel, (state, action) => ({
        ...state,
        selectedTravel: action.travel

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

function getDefaultTravelState(): Travel {
    return {
        id: '',
        startDate: '', // Hier deine Standardwerte für startDate, endDate, usw. einfügen
        endDate: '',
        country: '',
        city: '',
        activities: '',
        comment: '',
        rating:  ''
    };
}

export function getState(){
    return this.state;
}