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

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'employees',
    component: Employees
  },
  {
    path: 'employees/add',
    component: EmployeeFormComponent
  },
  {
    path: 'employees/edit/:id',
    component: EmployeeFormComponent
  },
  {
    path: 'departments',
    component: Departments
  },
  {
    path: 'attendance',
    component: AttendanceComponent
  },
  {
    path: 'leaves',
    component: Leaves
  },
  {
    path: 'payroll',
    component: PayrollComponent
  },
  {
    path: 'performance',
    component: PerformanceComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];