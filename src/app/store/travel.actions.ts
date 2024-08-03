import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";
import { TravelState } from "./travel.reducer";
import { Travel } from "../model/travel";

export const addTravel = createAction(
    '[Travel] Add',
    props<{ travel: Travel }>()
);

export const navigateToTravel = createAction(
    '[Travel] Navigate to Travel',
    props<{travel: Travel}>()
)