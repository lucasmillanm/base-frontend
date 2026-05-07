import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CarService, Car, CarRequest } from '../../services/car.service';

@Component({
  selector: 'app-garage',
  imports: [FormsModule, DecimalPipe],
  templateUrl: './garage.html',
  styleUrl: './garage.scss'
})
export class Garage implements OnInit {
  private carService = inject(CarService);

  cars = signal<Car[]>([]);
  showForm = false;
  loading = false;

  form: CarRequest = {
    make: '', model: '', year: new Date().getFullYear(),
    color: '', plate: '', mileage: 0, purchasePrice: 0
  };

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe(cars => this.cars.set(cars));
  }

  addCar() {
    this.loading = true;
    this.carService.addCar(this.form).subscribe({
      next: car => {
        this.cars.update(list => [...list, car]);
        this.showForm = false;
        this.loading = false;
        this.form = { make: '', model: '', year: new Date().getFullYear(), color: '', plate: '', mileage: 0, purchasePrice: 0 };
      },
      error: () => this.loading = false
    });
  }

  deleteCar(id: number) {
    this.carService.deleteCar(id).subscribe(() => {
      this.cars.update(list => list.filter(c => c.id !== id));
    });
  }
}
