import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Car } from '@core/models/car';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LoadCars, DeleteCar } from '@core/store/actions/car.actions';
import moment from 'moment';
import { Sort, SortDirection, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { languageSelector } from '@core/store/selectors/ui.selectors';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '@core/models/language';
import { State } from '@core/store';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

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
  cars$: Observable<State['cars']>;
  deleting$: Observable<State['cars']['deleting']>;
  colNames = colNames;
  dateformat$: Observable<string>;
  lang: string;

  langList = Language;

  sortedCars$: Observable<Car[]>;

  constructor(
    private store: Store<State>,
    private dialog: MatDialog
  ) {
    store.select(languageSelector).subscribe(lang => this.lang = lang);
    this.cars$ = store.select('cars');
    this.deleting$ = store.select(state => state.cars.deleting);
    this.updateSortedCars();
  }

  ngOnInit() {
    this.store.dispatch(new LoadCars());
    this.dateformat$ = this.store.select(state => state.ui.dateformat);
  }

  deleteCar(id: number) {
    const sub = this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new DeleteCar(id));
      }
    });
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

  localizeDate(date: string): Observable<string> {
    // console.log(date);
    if (date) {
      const parsedDate = moment(date, 'YYYY-MM-DD');
      return this.dateformat$.pipe(map(format => parsedDate.format(format)));
    }
  }
}
