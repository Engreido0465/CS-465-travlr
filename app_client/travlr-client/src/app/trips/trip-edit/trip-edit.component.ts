// src/app/trips/trip-edit/trip-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TripService } from '../../core/trip.service';
import { Trip } from '../../core/trip';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent implements OnInit {
  id = '';
  trip: Trip | null = null;
  saving = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trips: TripService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.trips.get(this.id).subscribe({
      next: t => { this.trip = { ...t }; },
      error: () => { this.error = 'Failed to load trip'; }
    });
  }

  save(): void {
    if (!this.trip) return;
    this.saving = true;

    const { _id, ...patch } = this.trip; // note to self: don’t send _id in the patch
    this.trips.update(this.id, patch).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: () => { this.error = 'Save failed'; this.saving = false; }
    });
  }
}
