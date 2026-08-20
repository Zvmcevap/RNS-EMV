import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrls: ['./navigation.css']
})
export class NavigationComponent {

  menuItems = [
    { title: 'Dashboard', route: '/dashboard' },
    { title: 'Employees', route: '/employees' },
    { title: 'Departments', route: '/departments' },
    { title: 'Attendance', route: '/attendance' },
    { title: 'Leaves', route: '/leaves' },
    { title: 'Payroll', route: '/payroll' },
    { title: 'Performance', route: '/performance' },
    { title: 'Notifications', route: '/notifications' },
    { title: 'Users', route: '/users' }
  ];

}