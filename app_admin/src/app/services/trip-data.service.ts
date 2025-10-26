import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private url = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) { }

  // ------------------------------------------------------
  // Get all trips
  // ------------------------------------------------------
  getTrips(): Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips');
    return this.http.get<Trip[]>(this.url);
  }

  // ------------------------------------------------------
  // Add a new trip
  // ------------------------------------------------------
  addTrip(formData: Trip): Observable<Trip> {
    // console.log('Inside TripDataService::addTrip');
    return this.http.post<Trip>(this.url, formData);
  }

  // ------------------------------------------------------
  // Get a specific trip by its code
  // ------------------------------------------------------
  getTrip(tripCode: string): Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrip');
    return this.http.get<Trip[]>(this.url + '/' + tripCode);
  }

  // ------------------------------------------------------
  // Update an existing trip
  // ------------------------------------------------------
  updateTrip(formData: Trip): Observable<Trip> {
    // console.log('Inside TripDataService::updateTrip');
    return this.http.put<Trip>(this.url + '/' + formData.code, formData);
  }
}
