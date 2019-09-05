import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CarService } from '@core/services/car.service';
import { Car } from '@core/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State as CarsState } from '@core/store/reducers/car.reducer';
import { UpdateCar, LoadCars, CreateCar } from '@core/store/actions/car.actions';
import { Observable, of } from 'rxjs';
import { State } from '@core/store';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarEditComponent implements OnInit {
  createNew = false;
  car: Car;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id === 'new') {
        this.createNew = true;
        this.car = {} as Car;
      } else {
        this.store.select(state => {
          const id = parseInt(params.id, 10);
          return state.cars.list.find(car => car.id === id);
        }).subscribe(car => {
          this.car = { ...car };
          this.changeDetector.detectChanges();
        });
      }
    });
  }


  onSave() {
    if (this.createNew) {
      this.store.dispatch(new CreateCar(this.car));
    } else {
      this.store.dispatch(new UpdateCar(this.car));
    }
    this.router.navigateByUrl('/app/cars/overview');
  }
}
