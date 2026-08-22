import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css'
})
export class DepartmentFormComponent implements OnInit {
  private departmentService = inject(DepartmentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  departmentId = '';
  isEditMode = false;
  loading = false;
  error = '';

  department: any = {
    name: '',
    description: '',
    manager: '',
    location: '',
    employeesCount: 0
  };

  ngOnInit(): void {
    this.departmentId =
      this.route.snapshot.paramMap.get('id') ?? '';

    this.isEditMode = !!this.departmentId;

    if (this.isEditMode) {
      this.loadDepartment();
    }
  }

  loadDepartment(): void {
    this.loading = true;
    this.error = '';

    this.departmentService
      .getDepartment(this.departmentId)
      .subscribe({
        next: (res: any) => {
          this.department = {
            ...this.department,
            ...res?.data?.department
          };

          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error('Failed to load department:', err);

          this.error =
            err?.error?.message ??
            'Failed to load department';

          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    const request = this.isEditMode
      ? this.departmentService.updateDepartment(
          this.departmentId,
          this.department
        )
      : this.departmentService.createDepartment(
          this.department
        );

    request.subscribe({
      next: () => {
        this.router.navigate(['/departments']);
      },

      error: (err) => {
        console.error('Failed to save department:', err);

        this.error =
          err?.error?.message ??
          'Failed to save department';

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}