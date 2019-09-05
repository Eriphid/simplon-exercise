import { Car } from '@core/models/car';
import * as fromCarActions from '@core/store/actions/car.actions';

export interface State {
  list: Car[];
}

export const initialState: State = {
  list: []
};

export function reducer(state = initialState, action: fromCarActions.Actions): State {
  switch (action.type) {
    case fromCarActions.ActionTypes.LoadCarsSuccess:
      return {
        ...state,
        list: action.cars
      };
      case fromCarActions.ActionTypes.DeleteCarSuccess:
        return {
          ...state,
          list: state.list.filter(car => car.id !== action.id)
        };
    default:
      return state;
  }
}
