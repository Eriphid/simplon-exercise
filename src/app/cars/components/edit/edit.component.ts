import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Car } from '@core/models/car';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateCar, CreateCar, LoadCars, LoadCar } from '@core/store/actions/car.actions';
import { State } from '@core/store';
import { Brand } from '@core/models/brand';
import { FuelType } from '@core/models/fuel-type';
import { carSelector } from '@core/store/selectors/car.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';
import { languageSelector } from '@core/store/selectors/ui.selectors';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CarEditComponent implements OnInit, OnDestroy {
  subsciptions = new Subscription();

  createNew = false;
  error: string = null;
  brands = Brand;
  fuelType = FuelType;
  form: FormGroup;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
  ) {
    store.select(languageSelector).subscribe(lang => dateAdapter.setLocale(lang));
  }

  private createForm(car: Car) {
    const salesDateValidator = (form: FormGroup) => {
      const sos: Date = form.value.startOfSales;
      const eos: Date = form.value.endOfSales;

      const makeError = (msg: string) => ({ 'sales-dates': msg });

      let error: { 'sales-dates': string } | false;

      if (sos && eos) {
        error = sos.getTime() > eos.getTime() ? makeError('SOS Must be inferior to EOS') : null;
        form.controls.startOfSales.setErrors(error);
        form.controls.endOfSales.setErrors(error);
      } else {
        error = sos || eos ? makeError('SOS & EOS must be either both empty or both filled') : null;
        if (sos) {
          form.controls.startOfSales.setErrors(null);
          form.controls.endOfSales.setErrors(error);
        } else if (eos) {
          form.controls.startOfSales.setErrors(error);
          form.controls.endOfSales.setErrors(null);
        } else {
          form.controls.startOfSales.setErrors(null);
          form.controls.endOfSales.setErrors(null);
        }
      }

      return error;
    };

    const parseDate = (date: string) => date ? new Date(date) : null;

    const newForm = this.fb.group({
      name: [car.name, Validators.required],
      horsePower: [car.horsePower, [Validators.required, Validators.min(0)]],
      brand: [car.brand, Validators.required],
      fuelType: [car.fuelType, Validators.required],
      price: [car.price],
      startOfSales: [parseDate(car.startOfSales)],
      endOfSales: [parseDate(car.endOfSales)]
    }, {
      validators: [salesDateValidator]
    });

    return newForm;
  }

  routeHandler(params: Params) {
    if (params.id === 'new') {
      this.createNew = true;
      this.form = this.createForm({} as Car);
      this.id = null;
    } else {
      this.store.dispatch(new LoadCar(params.id));
      const storeSubscription = this.store.select(carSelector).subscribe(car => {
        if (car) {
          this.form = this.createForm(car);
          this.id = car.id;
          this.cd.markForCheck();
        }
      });

      this.subsciptions.add(storeSubscription);
    }
  }

  ngOnInit() {
    const routeSubscription = this.route.params.subscribe(this.routeHandler.bind(this));
    this.subsciptions.add(routeSubscription);
  }

  ngOnDestroy() {
    this.subsciptions.unsubscribe();
  }

  carFromForm(value: FormGroup['value']) {
    const formatDate = (date: Date) => !date || isNaN(date.getTime()) ? '' : moment(date).format('YYYY-MM-DD');

    return {
      ...value,
      id: this.id,
      startOfSales: formatDate(value.startOfSales),
      endOfSales: formatDate(value.endOfSales)
    };
  }

  onSubmit() {
    if (this.createNew) {
      this.store.dispatch(new CreateCar(this.carFromForm(this.form.value)));
    } else {
      this.store.dispatch(new UpdateCar(this.carFromForm(this.form.value)));
    }
    this.router.navigateByUrl('/app/cars/overview');
  }

  actionName() {
    const action = this.createNew ? 'create' : 'update';
    return this.translate.get(`form.actions.${action}`);
  }
}
