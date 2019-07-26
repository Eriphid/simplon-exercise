import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CarService } from '@core/services/car.service';
import { Car } from '@core/models/car';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarEditComponent implements OnInit {
  car: Car;

  constructor(private route: ActivatedRoute, private router: Router, private carService: CarService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.carService.getCar(params.id).subscribe(car => {
        this.car = car;
      });
    });
  }


  onSave() {
    this.carService.updateCar(this.car).subscribe((data) => {
      console.log(data);
      this.router.navigateByUrl('/app/cars/overview');
    });
  }
}
