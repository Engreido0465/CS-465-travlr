import { Injectable, Inject } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripDataService } from './trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  getToken(): string {
    const token = this.storage.getItem('travlr-token');
    return token || '';
  }

  saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  logout(): void {
    this.storage.removeItem('travlr-token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > Date.now() / 1000;
  }

  currentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return {} as User;
  }

  login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd).subscribe({
      next: (value) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: (err) => console.log('Error:', err)
    });
  }

  register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd).subscribe({
      next: (value) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: (err) => console.log('Error:', err)
    });
  }
}
