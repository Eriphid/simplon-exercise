import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Car } from '@core/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateCar, CreateCar, LoadCars, LoadCar } from '@core/store/actions/car.actions';
import { State } from '@core/store';
import { Brand } from "@core/models/brand";
import { FuelType } from "@core/models/fuel-type";
import { carSelector } from "@core/store/selectors/car.selectors";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import moment from "moment";
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material';
import { languageSelector } from '@core/store/selectors/language.selectors';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CarEditComponent implements OnInit {
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
    private dateAdapter: DateAdapter<Date>
  ) {
    store.select(languageSelector).subscribe(lang => dateAdapter.setLocale(lang));
  }

  private createForm(car: Car) {
    
    const form = this.fb.group({
      name: [car.name, Validators.required],
      horsePower: [car.horsePower, Validators.required],
      brand: [car.brand, Validators.required],
      fuelType: [car.fuelType, Validators.required],
      price: [car.price],
      startOfSales: [car.startOfSales],
      endOfSales: [car.endOfSales]
    });
    
    const sos = form.get("startOfSales");
    const eos = form.get("endOfSales");
    
    const salesDateValidator = (control: FormControl) => {
      return Boolean(sos.value) === Boolean(eos.value) ? null : { 
        "required": control.toString() + " is required"
      }
    }
    sos.setValidators(salesDateValidator);
    eos.setValidators(salesDateValidator);
    // sos.valueChanges.subscribe(value => eos.setValidators(value ? Validators.required : null));
    // eos.valueChanges.subscribe(value => sos.setValidators(value ? Validators.required : null));

    return form;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id === 'new') {
        this.createNew = true;
        this.form = this.createForm({} as Car);
        this.id = null;
      } else {
        this.store.dispatch(new LoadCar(params.id));
        this.store.select(carSelector).subscribe(car => {
          if (car) {
            this.form = this.createForm(car);
            this.id = car.id;
            this.cd.markForCheck();
          }
        });
      }
    });
  }

  carFromForm(value: FormGroup["value"]) {
    return {
      ...value,
      id: this.id,
      startOfSales: moment(value.startOfSales).format("YYYY-MM-DD"),
      endOfSales: moment(value.endOfSales).format("YYYY-MM-DD")
    }
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
    const action = this.createNew ? "create" : "update";
    return this.translate.get(`form.actions.${action}`);
  }
}
