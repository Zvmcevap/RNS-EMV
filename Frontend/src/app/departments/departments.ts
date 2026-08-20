import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DepartmentService } from '../services/department.service';
import { Department } from '../models/department';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './departments.html',
  styleUrl: './departments.css'
})
export class Departments implements OnInit {

  private departmentService = inject(DepartmentService);

  departments: Department[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {

    this.loading = true;

    this.departmentService.getDepartments().subscribe({

      next: (res: any) => {

        this.departments = res.data.departments;
        this.loading = false;

      },

      error: () => {

        this.error = 'Failed to load departments.';
        this.loading = false;

      }

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

      }

    });

  }

}