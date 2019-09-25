import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromCarActions from '@core/store/actions/car.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CarService } from '@core/services/car.service';
import { of } from 'rxjs';

@Injectable()
export class CarEffects {

  @Effect()
  LoadCars$ = this.actions$
    .pipe(
      ofType(fromCarActions.ActionTypes.LoadCars),
      switchMap(() => this.carService.getCars()),
      map(cars => new fromCarActions.LoadCarsSuccess(cars)),
      catchError((error) => of(new fromCarActions.LoadCarsFailed(error)))
    );

  @Effect()
  LoadCar$ = this.actions$
    .pipe(
      ofType(fromCarActions.ActionTypes.LoadCar),
      switchMap((action: fromCarActions.LoadCar) => this.carService.getCar(action.id)),
      map(car => new fromCarActions.LoadCarSuccess(car)),
      catchError(error => of(new fromCarActions.LoadCarFailed(error)))
    );

  @Effect()
  DeleteCars$ = this.actions$.pipe(
    ofType(fromCarActions.ActionTypes.DeleteCar),
    switchMap((action: fromCarActions.DeleteCar) => this.carService.deleteCar(action.id).pipe(
      map(() => new fromCarActions.DeleteCarSuccess(action.id))
    )),
    catchError(error => of(new fromCarActions.DeleteCarFailed(error)))
  );

  @Effect()
  UpdateCar = this.actions$.pipe(
    ofType(fromCarActions.ActionTypes.UpdateCar),
    switchMap((action: fromCarActions.UpdateCar) => this.carService.updateCar(action.car).pipe(
      map(() => new fromCarActions.UpdateCarSuccess(action.car))
    )),
    catchError(error => of(new fromCarActions.UpdateCarFailed(error)))
  );

  @Effect()
  CreateCar = this.actions$.pipe(
    ofType(fromCarActions.ActionTypes.CreateCar),
    switchMap((action: fromCarActions.CreateCar) => this.carService.createCar(action.car)),
    map(car => new fromCarActions.CreateCarSuccess(car)),
    catchError(error => of(new fromCarActions.CreateCarFailed(error)))
  );

  constructor(
    private carService: CarService,
    private readonly actions$: Actions) { }
}
