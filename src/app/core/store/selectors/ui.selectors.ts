import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUIReducer from '@core/store/reducers/ui.reducer';

export const featureSelector = createFeatureSelector<fromUIReducer.State>('ui');
export const languageSelector = createSelector(
    featureSelector,
    (state: fromUIReducer.State) => state.language
);
