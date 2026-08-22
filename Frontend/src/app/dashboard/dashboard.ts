import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { catchError, forkJoin, Observable, of } from 'rxjs';

import { EmployeeService } from '../services/employee.service';
import { DepartmentService } from '../services/department.service';
import { AttendanceService } from '../services/attendance.service';
import { LeaveService } from '../services/leave.service';
import { PayrollService } from '../services/payroll.service';
import { PerformanceService } from '../services/performance.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  private attendanceService = inject(AttendanceService);
  private leaveService = inject(LeaveService);
  private payrollService = inject(PayrollService);
  private performanceService = inject(PerformanceService);

  private cdr = inject(ChangeDetectorRef);

  cards = [
    {
      title: 'Employees',
      value: 0,
      icon: '👨‍💼',
      route: '/employees',
      accent: 'blue'
    },
    {
      title: 'Departments',
      value: 0,
      icon: '🏢',
      route: '/departments',
      accent: 'purple'
    },
    {
      title: 'Attendance',
      value: 0,
      icon: '📅',
      route: '/attendance',
      accent: 'green'
    },
    {
      title: 'Leaves',
      value: 0,
      icon: '🌴',
      route: '/leaves',
      accent: 'teal'
    },
    {
      title: 'Payroll',
      value: 0,
      icon: '💰',
      route: '/payroll',
      accent: 'amber'
    },
    {
      title: 'Performance',
      value: 0,
      icon: '⭐',
      route: '/performance',
      accent: 'rose'
    }
  ];

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    forkJoin({
      employees: this.safe(
        this.employeeService.getEmployees(),
        'employees'
      ),

      departments: this.safe(
        this.departmentService.getDepartments(),
        'departments'
      ),

      attendance: this.safe(
        this.attendanceService.getAttendance(),
        'attendance'
      ),

      leaves: this.safe(
        this.leaveService.getLeaves(),
        'leaves'
      ),

      payroll: this.safe(
        this.payrollService.getAll(),
        'payroll'
      ),

      performance: this.safe(
        this.performanceService.getAll(),
        'performance'
      )
    }).subscribe({
      next: (res) => {
        this.setCardValue(
          'Employees',
          this.count(res.employees, 'employees')
        );

        this.setCardValue(
          'Departments',
          this.count(res.departments, 'departments')
        );

        // Backend uses singular "attendance"
        this.setCardValue(
          'Attendance',
          this.count(res.attendance, 'attendance')
        );

        this.setCardValue(
          'Leaves',
          this.count(res.leaves, 'leaves')
        );

        this.setCardValue(
          'Payroll',
          this.count(res.payroll, 'payrolls')
        );

        this.setCardValue(
          'Performance',
          this.count(res.performance, 'performances')
        );

        this.cdr.detectChanges();
      }
    });
  }

  private count(response: any, key: string): number {
    const rows = response?.data?.[key];

    return Array.isArray(rows) ? rows.length : 0;
  }

  private setCardValue(title: string, value: number): void {
    const card = this.cards.find(card => card.title === title);

    if (card) {
      card.value = value;
    }
  }

  private safe<T>(
    request: Observable<T>,
    name: string
  ): Observable<T | null> {
    return request.pipe(
      catchError(error => {
        console.error(`Dashboard: failed to load ${name}`, error);
        return of(null);
      })
    );
  }
}