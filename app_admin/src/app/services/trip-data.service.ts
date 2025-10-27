import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('travlr-token'); // same key used in authentication.service.ts
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.baseUrl}/trips`);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/trips/${tripCode}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    const headers = this.getAuthHeaders();
    return this.http.post<Trip>(`${this.baseUrl}/trips`, trip, { headers });
  }

  updateTrip(tripCode: string, trip: Trip): Observable<Trip> {
    const headers = this.getAuthHeaders();
    return this.http.put<Trip>(`${this.baseUrl}/trips/${tripCode}`, trip, { headers });
  }

  deleteTrip(tripCode: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/trips/${tripCode}`, { headers });
  }

  login(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, {
      email: user.email,
      password
    });
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, {
      email: user.email,
      name: user.name,
      password
    });
  }
}
