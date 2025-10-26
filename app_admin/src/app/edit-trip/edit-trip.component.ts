import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    console.log('EditTripComponent::ngOnInit');

    // Retrieve stashed trip ID from local storage
    const tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something went wrong — couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('tripCode: ' + tripCode);

    // Build the edit form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Retrieve trip details from backend
    this.tripDataService.getTrip(tripCode).subscribe({
      next: (value: any) => {
        this.trip = value;

        // ✅ Safely format date for input type="date"
        if (this.trip.start) {
          const formattedDate = new Date(this.trip.start).toISOString().split('T')[0];
          this.editForm.patchValue({
            ...this.trip,
            start: formattedDate
          });
        } else {
          this.editForm.patchValue(this.trip);
        }

        if (!value) {
          this.message = 'No Trip Retrieved!';
        } else {
          this.message = 'Trip: ' + tripCode + ' retrieved';
        }

        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    });
  }

  // Handle form submission
  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value).subscribe({
        next: (value: any) => {
          console.log('Trip updated successfully:', value);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error:', error);
        }
      });
    }
  }

  // Quick access to form fields (for template binding)
  get f() {
    return this.editForm.controls;
  }
}
