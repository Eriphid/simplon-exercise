import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromCarsReducer from "@core/store/reducers/car.reducer"

export const carsSelector = createFeatureSelector("cars");
export const carSelector = createSelector(
    carsSelector,
    (state: fromCarsReducer.State) => state.selected
)