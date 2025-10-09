import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TripService } from '../../core/trip.service';
import { Trip } from '../../core/trip';          // <-- import Trip from core/trip (not from the service)

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  loading = false;
  error = '';
  trips: Trip[] = [];

  constructor(private tripsSvc: TripService) {}

  ngOnInit(): void {
    this.loading = true;
    this.tripsSvc.list().subscribe({
      next: (data) => { this.trips = data; this.loading = false; },
      error: () => { this.error = 'Failed to load trips'; this.loading = false; }
    });
  }
}
