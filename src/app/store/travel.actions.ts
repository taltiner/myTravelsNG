import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { TravelState } from "./travel.state";

export const addTravel = createAction(
    '[Travel] Add',
    props<{ travel: TravelState }>()
);