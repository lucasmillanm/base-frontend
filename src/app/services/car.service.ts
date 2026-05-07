import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  mileage: number;
  purchasePrice: number;
  createdAt: string;
}

export interface CarRequest {
  make: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  mileage: number;
  purchasePrice: number;
}

@Injectable({ providedIn: 'root' })
export class CarService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getCars() {
    return this.http.get<Car[]>(`${this.baseUrl}/api/cars`);
  }

  addCar(car: CarRequest) {
    return this.http.post<Car>(`${this.baseUrl}/api/cars`, car);
  }

  deleteCar(id: number) {
    return this.http.delete(`${this.baseUrl}/api/cars/${id}`);
  }
}
