import { createReducer, on } from "@ngrx/store";
import { addTravel } from "./travel.actions";
import { TravelState } from "./travel.state";

const initialState: TravelState = {
    travels: []
};

export const travelReducer = createReducer(
    initialState,
    on(addTravel, (state, action) => ({
        ...state, 
        travels: [...state.travels, action.form]
    }))
  
);