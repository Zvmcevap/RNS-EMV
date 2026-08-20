import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})
export class UsersComponent implements OnInit {

  private userService = inject(UserService);

  users: User[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;

    this.userService.getAll().subscribe({
      next: (response: any) => {
        this.users = response.data.users;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }

}