import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CarService } from '@core/services/car.service';
import { Car } from '@core/models/car';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadCars, DeleteCar } from '@core/store/actions/car.actions';
import { State } from '@core/store/reducers/car.reducer';
import { TranslateService } from '@ngx-translate/core';
import moment, { lang } from 'moment';

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
  lang: string;

  constructor(
    private store: Store<State>,
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    // translate.setDefaultLang("en");
    const lang = translate.getBrowserLang();
    moment.locale(lang);
    if (/fr|en/.test(lang)) {
      translate.use(lang);
    } else {
      translate.use("en");
    }
    this.cars$ = store.select('cars');
    store.dispatch(new LoadCars());
  }

  ngOnInit() { }

  deleteCar(id: number) {
    this.store.dispatch(new DeleteCar(id));
  }

  createCar() {
    this.router.navigateByUrl('app/cars/edit/new');
  }

  formatDate(date: string) {
    return moment(date, "YYYY-MM-DD").format('L');
  }
}
