import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Car } from '@core/models/car';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadCars, DeleteCar } from '@core/store/actions/car.actions';
import { State } from '@core/store/reducers/car.reducer';
import moment from 'moment';
import { Sort, SortDirection } from '@angular/material';
import { map } from 'rxjs/operators';
import { languageSelector } from '@core/store/selectors/ui.selectors';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@core/models/language';
import { ChangeLanguage } from '@core/store/actions/ui.actions';

function compare(a: any, b: any, direction: SortDirection) {
  return (a < b ? -1 : 1) * (direction === 'asc' ? 1 : -1);
}

function getSortPredicate(key: keyof Car, direction: SortDirection): (a: Car, b: Car) => number {
  return (a, b) => compare(a[key], b[key], direction);
}

const colNames = [
  'name',
  'brand',
  'price',
  'fuelType',
  'horsePower',
  'startOfSales',
  'endOfSales',
  'actions'
];

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarOverviewComponent implements OnInit {
  cars$: Observable<State>;
  colNames = colNames;
  dateformat = 'YYYY-MM-DD';
  lang: string;

  langList = Language;

  sortedCars$: Observable<Car[]>;

  constructor(
    private store: Store<State>,
    private router: Router,
    private translate: TranslateService
  ) {
    store.select(languageSelector).subscribe(lang => this.lang = lang);
    this.cars$ = store.select('cars');
    this.updateSortedCars();
  }

  ngOnInit() {
    this.store.dispatch(new LoadCars());
    this.translate.get('date.format').subscribe(format => this.dateformat = format);
  }

  deleteCar(id: number) {
    this.store.dispatch(new DeleteCar(id));
  }

  updateSortedCars(sort?: Sort) {
    if (!sort || !sort.active || !sort.direction) {
      this.sortedCars$ = this.cars$.pipe(map(state => state.list));
    } else {
      const predicate = getSortPredicate(sort.active as keyof Car, sort.direction);
      this.sortedCars$ = this.cars$.pipe(
        map(
          cars => [...cars.list].sort(predicate)
        )
      );
    }
  }

  changeLanguage(lang: Language) {
    this.store.dispatch(new ChangeLanguage(lang));
  }

  localizeDate(date: string) {
    return date ? moment(date, 'YYYY-MM-DD').format(this.dateformat) : '';
  }
}
