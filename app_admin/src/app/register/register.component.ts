import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = {
    name: '',
    email: ''
  };

  password: string = '';
  message: string = '';

  constructor(private authService: AuthenticationService, private router: Router) {}

  
  onRegister(): void {
    if (!this.user.name || !this.user.email || !this.password) {
      this.message = 'All fields are required.';
      return;
    }

      this.authService.register(this.user, this.password);
    this.message = 'Registration successful! Redirecting...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
