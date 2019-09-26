import { Car } from '@core/models/car';
import * as fromCarActions from '@core/store/actions/car.actions';

export interface State {
  list: Car[];
  loading: boolean;
  selected?: Car;
  deleting: number[];
}

export const initialState: State = {
  list: [],
  loading: false,
  deleting: []
};

export function reducer(state = initialState, action: fromCarActions.Actions): State {
  switch (action.type) {
    case fromCarActions.ActionTypes.LoadCars:
      return {
        ...state,
        loading: true
      };
    case fromCarActions.ActionTypes.CreateCarFailed:
      return {
        ...state,
        loading: false
      };
    case fromCarActions.ActionTypes.LoadCarsSuccess:
      return {
        ...state,
        loading: false,
        list: action.cars
      };
    case fromCarActions.ActionTypes.DeleteCar:
      return {
        ...state,
        deleting: [...state.deleting, action.id]
      };
    case fromCarActions.ActionTypes.DeleteCarSuccess:
      return {
        ...state,
        list: state.list.filter(car => car.id !== action.id),
        deleting: state.deleting.filter(id => id !== action.id)
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
    case fromCarActions.ActionTypes.LoadCar:
      return {
        ...state,
        selected: null
      };
    case fromCarActions.ActionTypes.LoadCarSuccess:
      return {
        ...state,
        selected: action.selectedCar
      };
    default:
      return state;
  }
}
