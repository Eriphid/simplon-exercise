import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CarService } from '@core/services/car.service';
import { Car } from '@core/models/car';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadCars, DeleteCar } from '@core/store/actions/car.actions';
import { State } from '@core/store/reducers/car.reducer';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarOverviewComponent implements OnInit {
  cars$: Observable<State>;
  cols = [
    'name',
    'brand',
    'price',
    'fuelType',
    'horsePower',
    'startOfSales',
    'endOfSales',
    'actions'
  ];

  constructor(private store: Store<State>, private router: Router, private changeDetectorRefs: ChangeDetectorRef) {
    this.cars$ = store.select('cars');
    store.dispatch(new LoadCars());
    // this.cars$.subscribe(e => console.log(e));
  }

  ngOnInit() {
    this.update();
  }

  update() {
    // this.carService.getCars().subscribe(data => { this.cars = data; this.changeDetectorRefs.markForCheck(); });
  }


  deleteCar(id: number) {
    // this.carService.deleteCar(id).subscribe(() => this.update());
    this.store.dispatch(new DeleteCar(id));
  }

  createCar() {
    this.router.navigateByUrl('app/cars/edit/new');
  }
}
