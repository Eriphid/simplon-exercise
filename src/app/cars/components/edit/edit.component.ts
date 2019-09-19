import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Car } from '@core/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateCar, CreateCar, LoadCars, LoadCar } from '@core/store/actions/car.actions';
import { State } from '@core/store';
import { Brand } from "@core/models/brand";
import { FuelType } from "@core/models/fuel-type";
import { stringifyDate } from 'app/cars/shared/date.adapter';
import { carSelector } from "@core/store/selectors/car.selectors";
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
    private store: Store<State>,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id === 'new') {
        this.createNew = true;
        this.car = {} as Car;
      } else {
        this.store.dispatch(new LoadCar(params.id));
        this.store.select(carSelector).subscribe(car => {
          if (car) {
            this.car = { ...car };
            this.cd.markForCheck();
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
