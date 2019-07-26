import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '@core/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly baseUrl = 'api/cars/';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(this.baseUrl + id);
  }

  createCar(car: Car) {
    return this.http.post<Car>(this.baseUrl, car);
  }

  updateCar(car: Car) {
    return this.http.put<Car>(this.baseUrl, car);
  }

  deleteCar(id: number) {
    return this.http.delete<void>(this.baseUrl + id);
  }
}
