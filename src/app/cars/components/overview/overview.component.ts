import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CarService } from '@core/services/car.service';
import { Car } from '@core/models/car';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarOverviewComponent implements OnInit {
  cars: Car[];
  cols = [
    'name',
    'brand',
    'price',
    'fuelType',
    'horsePower',
    'startOfSales',
    'endOfSales'
  ];

  constructor(private carService: CarService, private changeDetectorRefs: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.carService.getCars().subscribe(data => { this.cars = data; this.changeDetectorRefs.markForCheck(); });
  }

}
