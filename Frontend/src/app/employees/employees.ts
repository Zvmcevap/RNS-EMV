import { Component, OnInit, inject, ChangeDetectorRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { EmployeeService } from '../services/employee.service';
import { EmployeeCardComponent } from './employee-card/employee-card'; 

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,  
    RouterLink,   
    EmployeeCardComponent 
  ],
  templateUrl: './employees.html',
  styleUrls: ['./employees.css']
})
export class Employees implements OnInit {
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);
  private platformId = inject(PLATFORM_ID);

  employees: any[] = [];
  filteredEmployees: any[] = [];

  loading = true;
  error = '';
  searchText = '';
  isAdmin = false;

  ngOnInit(): void {
    this.checkAdminRole();
    this.loadEmployees();
  }

  checkAdminRole(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.isAdmin = false;
      return;
    }
    
    const role = localStorage.getItem('role');
    this.isAdmin = role?.toLowerCase() === 'admin';
  }

  loadEmployees(): void {
    this.loading = true;

    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        this.employees = res?.data?.employees ?? [];
        this.filteredEmployees = [...this.employees];
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('API Error', err);
        this.loading = false;
        this.cdr.detectChanges(); 
      }
    });
  }

  search(): void {
    const value = this.searchText.trim().toLowerCase();

    if (!value) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    this.filteredEmployees = this.employees.filter(emp => {
      const fullName = `${emp.firstName ?? ''} ${emp.lastName ?? ''}`.toLowerCase();
      const department = (emp.department ?? '').toLowerCase();
      const jobTitle = (emp.jobTitle ?? '').toLowerCase();

      return (
        fullName.includes(value) ||
        department.includes(value) ||
        jobTitle.includes(value)
      );
    });
  }

  deleteEmployee(id: string): void {
    if (!this.isAdmin) {
      alert('You do not have permission to delete employees.');
      return;
    }

    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees(); 
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete employee.');
        this.cdr.detectChanges(); 
      }
    });
  }
}