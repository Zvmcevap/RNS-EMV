import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { DashboardComponent } from './dashboard/dashboard';
import { Employees } from './employees/employees';
import { EmployeeFormComponent } from './employees/employee-form/employee-form';
import { Departments } from './departments/departments';
import { AttendanceComponent } from './attendance/attendance';
import { Leaves } from './leaves/leaves';
import { PayrollComponent } from './payroll/payroll';
import { PerformanceComponent } from './performance/performance';
import { NotificationsComponent } from './notifications/notifications';
import { UsersComponent } from './users/users';
import { DepartmentFormComponent } from './departments/department-form/department-form';
import { AttendanceFormComponent } from './attendance/attendance-form/attendance-form';
import { LeaveFormComponent } from './leaves/leave-form/leave-form';
import { PayrollFormComponent } from './payroll/payroll-form/payroll-form';
import { PerformanceFormComponent } from './performance/performance-form/performance-form';
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },

  // Employees
  {
    path: 'employees',
    component: Employees,
  },
  {
    path: 'employees/add',
    component: EmployeeFormComponent,
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeFormComponent,
  },

  // Departments
  {
    path: 'departments',
    component: Departments,
  },
  {
    path: 'departments/add',
    component: DepartmentFormComponent,
  },
  {
    path: 'departments/edit/:id',
    component: DepartmentFormComponent,
  },

  // Attendance
  {
    path: 'attendance',
    component: AttendanceComponent,
  },
  {
    path: 'attendance/add',
    component: AttendanceFormComponent,
  },
  {
    path: 'attendance/edit/:id',
    component: AttendanceFormComponent,
  },

  // Leaves
  {
    path: 'leaves',
    component: Leaves,
  },
  {
    path: 'leaves/add',
    component: LeaveFormComponent,
  },
  {
    path: 'leaves/edit/:id',
    component: LeaveFormComponent,
  },

  // Payroll
  {
    path: 'payroll',
    component: PayrollComponent,
  },
  {
    path: 'payroll/add',
    component: PayrollFormComponent,
  },
  {
    path: 'payroll/edit/:id',
    component: PayrollFormComponent,
  },

  // Performance
  {
    path: 'performance',
    component: PerformanceComponent,
  },
  {
    path: 'performance/add',
    component: PerformanceFormComponent,
  },
  {
    path: 'performance/edit/:id',
    component: PerformanceFormComponent,
  },

  // Other pages
  {
    path: 'notifications',
    component: NotificationsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },

  // MUST ALWAYS BE LAST
  {
    path: '**',
    redirectTo: '',
  },
];
