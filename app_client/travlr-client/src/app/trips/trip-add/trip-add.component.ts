// src/app/trips/trip-add/trip-add.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TripService } from '../../core/trip.service';
import { Trip } from '../../core/trip';

@Component({
  selector: 'app-trip-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trip-add.component.html',
  styleUrls: ['./trip-add.component.css']
})
export class TripAddComponent {
  // note to self: minimal UI state
  saving = false;
  error = '';

  // note to self: initialize with valid defaults so template bindings never crash
  trip: Trip = {
    name: '',
    description: '',
    description2: '',
    length: 1,
    // keep API happy with yyyy-mm-dd string
    start: new Date().toISOString().slice(0, 10),
    price: 0,
    image: ''
  } as unknown as Trip;

  constructor(private trips: TripService, private router: Router) {}

  save(): void {
    this.saving = true;
    // normalize numeric/date fields before sending
    const payload: Trip = {
      ...this.trip,
      length: Number(this.trip.length),
      price: Number(this.trip.price),
      start: typeof this.trip.start === 'string'
        ? this.trip.start
        : new Date(this.trip.start).toISOString().slice(0, 10)
    };

    this.trips.create(payload).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: () => { this.error = 'Create failed'; this.saving = false; }
    });
  }
}
