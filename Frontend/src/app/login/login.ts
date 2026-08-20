import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';

  loading = false;
  error = '';

  login(): void {
    this.loading = true;
    this.error = '';

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        const token = response?.token || response?.data?.token || response?.accessToken || response?.data?.accessToken;
        const user = response?.data?.user || response?.user || response?.data;
        const role = user?.role || response?.role || response?.data?.role;

        if (token) {
          localStorage.setItem('token', token);
        }

        if (role) {
          localStorage.setItem('role', role);
        }

        // 👈 SAVE THE USER OBJECT SO THE SIDEBAR CAN DISPLAY IT
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }

        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.message || err.error?.error || 'Invalid email or password';
      }
    });
  }
}