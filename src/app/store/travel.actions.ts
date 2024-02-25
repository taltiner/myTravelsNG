import { FormGroup } from "@angular/forms";
import { createAction, props } from "@ngrx/store";

export const addTravel = createAction(
    '[Travel] Add',
    props<{form: FormGroup}>()
);