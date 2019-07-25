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
    return this.http.get<Car>(this.baseUrl + '/' + id);
  }

  createCar(car: Car) {
    return this.http.post(this.baseUrl, car);
  }

  updateTask(car: Car) {
    return this.http.put(this.baseUrl, car);
  }

  deleteTask(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
