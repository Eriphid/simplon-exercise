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
    case fromCarActions.ActionTypes.UpdateCarSuccess:
      return {
        ...state,
        list: state.list.map(car => car.id === action.car.id ? action.car : car)
      };
    case fromCarActions.ActionTypes.CreateCarSuccess:
      return {
        ...state,
        list: [...state.list, action.car]
      };
    default:
      return state;
  }
}
