import * as fromCarReducer from '@core/store/reducers/car.reducer';
import * as fromUIReducer from '@core/store/reducers/ui.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  cars: fromCarReducer.State;
  ui: fromUIReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  cars: fromCarReducer.reducer,
  ui: fromUIReducer.reducer
};
