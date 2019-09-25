import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Car } from '../models/car';
import { FuelType } from '../models/fuel-type';
import { Brand } from '@core/models/brand';

@Injectable({
  providedIn: 'root'
})
export class InMemoryCarService implements InMemoryDbService {

  createDb() {
    const cars: Car[] = [
      {
        id: 1,
        name: 'Clio',
        brand: Brand.Renault,
        fuelType: FuelType.Gasoline,
        horsePower: 100,
        price: 17500,
        startOfSales: '2010-08-01',
        endOfSales: '2020-07-31'
      },
      {
        id: 2,
        name: 'Zoe',
        brand: Brand.Renault,
        fuelType: FuelType.Electric,
        horsePower: 92,
        price: 25000,
        startOfSales: '2012-01-01',
        endOfSales: '2024-12-31'
      },
      {
        id: 3,
        name: 'Twingo',
        brand: Brand.Renault,
        fuelType: FuelType.Gasoline,
        horsePower: 75,
        price: 12500,
        startOfSales: '2000-05-01',
        endOfSales: '2014-04-30'
      },
      {
        id: 4,
        name: 'Duster',
        brand: Brand.Dacia,
        fuelType: FuelType.Gasoline,
        horsePower: 115,
        price: 19150,
        startOfSales: '2008-09-01',
        endOfSales: '2015-08-31'
      },
      {
        id: 5,
        name: 'Sandero',
        brand: Brand.Dacia,
        fuelType: FuelType.Gasoline,
        horsePower: 95,
        price: 13750,
        startOfSales: '2004-02-01',
        endOfSales: '2015-01-31'
      },
      {
        id: 6,
        name: 'A110',
        brand: Brand.Alpine,
        fuelType: FuelType.Gasoline,
        horsePower: 252,
        price: 40000,
        startOfSales: '2018-01-01',
        endOfSales: '2030-12-31'
      },
    ];

    return { cars };
  }
}
