import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private departmentService = inject(DepartmentService);
  departments: Department[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.getDepartments();
    this.cdr.detectChanges();
  }

  getDepartments(): void {
    this.loading = true;

    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        this.departments = res.data.departments;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: () => {
        this.error = 'Failed to load departments.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteDepartment(id: string): void {
    if (!confirm('Delete this department?')) return;

    this.departmentService.deleteDepartment(id).subscribe({
      next: () => {
        this.getDepartments();
      },

      error: () => {
        alert('Delete failed');
      },
    });
    this.cdr.detectChanges();
  }
}
