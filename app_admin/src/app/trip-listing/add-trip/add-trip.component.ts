import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../../services/trip-data.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  message = '';

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  onSubmit(form: any): void {
    if (form.valid) {
      this.tripDataService.addTrip(form.value).subscribe({
        next: (trip: Trip) => {
          this.message = 'Trip added successfully!';
          console.log('Trip added:', trip);
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: (err: any) => console.error('Error adding trip:', err)
      });
    } else {
      this.message = 'Please fill out all required fields.';
    }
  }
}
