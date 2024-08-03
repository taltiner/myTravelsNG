import { createSelector } from '@ngrx/store';
import { TravelState } from './travel.state';

export const selectTravelState = (state: { travel: TravelState }) => state.travel;

