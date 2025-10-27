import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../../services/trip-data.service';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  tripCode: string = '';
  trip: Trip = {
    _id: '',
    code: '',
    name: '',
    length: 0,
    start: '',
    resort: '',
    perPerson: 0,
    image: '',
    description: ''
  };
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // Get tripCode from the URL
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';

    // Load the trip details from the API
    if (this.tripCode) {
      this.tripDataService.getTrip(this.tripCode).subscribe({
        next: (trip: Trip) => {
          this.trip = trip;
        },
        error: (err: any) => {
          console.error('Error loading trip:', err);
        }
      });
    }
  }

  // Handle form submission to update the trip
  onSubmit(): void {
    if (!this.tripCode) return;

    this.tripDataService.updateTrip(this.trip).subscribe({
      next: (updatedTrip: Trip) => {
        this.message = 'Trip updated successfully!';
        console.log('Trip updated:', updatedTrip);
        this.router.navigate(['/']); // redirect to main trip listing
      },
      error: (err: any) => {
        console.error('Error updating trip:', err);
        this.message = 'Error updating trip.';
      }
    });
  }
}
