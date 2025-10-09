// src/app/core/trip.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Trip } from './trip'; // note to self: single Trip definition lives here

@Injectable({ providedIn: 'root' })
export class TripService {
  // via proxy.conf.json, /api -> http://localhost:3000
  private base = '/api/trips';

  constructor(private http: HttpClient) {}

  list(): Observable<Trip[]> {
    return this.http.get<{ trips: Trip[] }>(this.base)
      .pipe(map(r => r.trips));
  }

  get(id: string): Observable<Trip> {
    return this.http.get<{ trip: Trip }>(`${this.base}/${id}`)
      .pipe(map(r => r.trip));
  }

  create(trip: Trip): Observable<Trip> {
    return this.http.post<{ trip: Trip }>(this.base, trip)
      .pipe(map(r => r.trip));
  }

  update(id: string, patch: Partial<Trip>): Observable<Trip> {
    return this.http.put<{ trip: Trip }>(`${this.base}/${id}`, patch)
      .pipe(map(r => r.trip));
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
