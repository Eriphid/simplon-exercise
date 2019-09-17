import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Car } from '@core/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateCar, CreateCar, LoadCars } from '@core/store/actions/car.actions';
import { State } from '@core/store';
import { Brand } from "@core/models/brand";
import { FuelType } from "@core/models/fuel-type";
import { stringifyDate } from 'app/cars/shared/date.adapter';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CarEditComponent implements OnInit {
  createNew = false;
  car: Car;
  error: string = null;
  brands = Brand;
  fuelType = FuelType;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {
    const editComponent = this;
    this.route.params.subscribe(params => {
      if (params.id === 'new') {
        this.createNew = true;
        this.car = {} as Car;
      } else {
        this.store.select(state => {
          const id = parseInt(params.id, 10);
          const list = state.cars.list;
          if (list.length === 0) {
            if (!state.cars.loading) {
              this.store.dispatch(new LoadCars());
            }
            return null;
          } else {
            return list.find(car => car.id === id);
          }
        }).subscribe({
          next(car) {
            if (car === null) {
              editComponent.error = `Car id "${params.id}" does not exist`;
            } else if (car) {
              editComponent.car = { ...car };
            }
          },
          error(e) {
            editComponent.error = e || "An unknown error has occured";
          }
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

  onDateChange(key: string, date: Date) {
    this.car[key] = stringifyDate(date);
  }
}
