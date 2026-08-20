import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {

  cards = [
    {
      title: 'Employees',
      value: 128,
      icon: '👨‍💼',
      route: '/employees',
      accent: 'blue'
    },
    {
      title: 'Departments',
      value: 12,
      icon: '🏢',
      route: '/departments',
      accent: 'purple'
    },
    {
      title: 'Attendance',
      value: 96,
      icon: '📅',
      route: '/attendance',
      accent: 'green'
    },
    {
      title: 'Leaves',
      value: 18,
      icon: '🌴',
      route: '/leaves',
      accent: 'teal'
    },
    {
      title: 'Payroll',
      value: 64,
      icon: '💰',
      route: '/payroll',
      accent: 'amber'
    },
    {
      title: 'Performance',
      value: 41,
      icon: '⭐',
      route: '/performance',
      accent: 'rose'
    }
  ];

}