import { FormControl, FormGroup } from "@angular/forms";
import { createReducer, on } from "@ngrx/store";
import { addTravel } from "./travel.actions";
import { TravelState } from "./travel.state";

const initialTravel = new FormGroup({
    'startDate': new FormControl('2024-08-05'),
    'endDate': new FormControl('2024-08-10'),
    'country': new FormControl('test'),
    'city': new FormControl('test'),
    'activities': new FormControl('test'),
    'comment': new FormControl('test'),
    'rating': new FormGroup({
        'rating': new FormControl(4)
    })
});

const initialState: TravelState = {
    travels: [initialTravel]
};

export const travelReducer = createReducer(
    initialState,
    on(addTravel, (state, action) => ({
        ...state,
        travels: [...state.travels, action.form]
    }))

);