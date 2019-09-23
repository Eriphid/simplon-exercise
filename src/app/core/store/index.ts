import * as fromCarReducer from '@core/store/reducers/car.reducer';
import * as fromLanguageReducer from '@core/store/reducers/language.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  cars: fromCarReducer.State;
  language: 'fr' | 'en';
}

export const reducers: ActionReducerMap<State> = {
  cars: fromCarReducer.reducer,
  language: fromLanguageReducer.reducer
};
