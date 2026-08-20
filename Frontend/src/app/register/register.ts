import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  role = 'employee';

  image!: File;

  loading = false;
  error = '';

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.image = input.files[0];
    }

  }

  register(): void {

    this.loading = true;
    this.error = '';

    const formData = new FormData();

    formData.append('firstName', this.firstName);
    formData.append('lastName', this.lastName);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    formData.append('password', this.password);
    formData.append('role', this.role);

    if (this.image) {
      formData.append('imageURL', this.image);
    }

    this.authService.register(formData).subscribe({

      next: () => {

        this.loading = false;

        this.router.navigate(['/login']);

      },

      error: (err) => {

        this.loading = false;

        this.error =
          err.error?.message || 'Registration failed';

      }

    });

  }

}