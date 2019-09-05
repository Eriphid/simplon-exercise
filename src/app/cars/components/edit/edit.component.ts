import { Component, OnInit } from '@angular/core';
import { Car } from '@core/models/car';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UpdateCar, CreateCar } from '@core/store/actions/car.actions';
import { State } from '@core/store';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CarEditComponent implements OnInit {
  createNew = false;
  car: Car;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
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
