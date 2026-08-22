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

import { PerformanceService } from '../../services/performance.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-performance-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './performance-form.html',
  styleUrl: './performance-form.css'
})
export class PerformanceFormComponent implements OnInit {
  private performanceService = inject(PerformanceService);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  performanceId = '';
  isEditMode = false;
  loading = false;
  error = '';

  employees: any[] = [];

  performance: any = {
    employee: '',
    reviewDate: '',
    reviewer: '',
    score: 0,
    goals: '',
    comments: ''
  };

  ngOnInit(): void {
    this.performanceId =
      this.route.snapshot.paramMap.get('id') ?? '';

    this.isEditMode = !!this.performanceId;

    this.loadEmployees();

    if (this.isEditMode) {
      this.loadPerformance();
    }
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res: any) => {
        this.employees =
          res?.data?.employees ?? [];

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Failed to load employees:', err);
      }
    });
  }

  loadPerformance(): void {
    this.loading = true;
    this.error = '';

    this.performanceService
      .getById(this.performanceId)
      .subscribe({
        next: (res: any) => {
          const record = res?.data?.performance;

          if (record) {
            this.performance = {
              ...record,

              employee:
                typeof record.employee === 'object'
                  ? record.employee?._id ?? ''
                  : record.employee ?? ''
            };
          }

          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (err) => {
          console.error('Failed to load performance:', err);

          this.error =
            err?.error?.message ??
            'Failed to load performance review';

          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    const request = this.isEditMode
      ? this.performanceService.update(
          this.performanceId,
          this.performance
        )
      : this.performanceService.create(
          this.performance
        );

    request.subscribe({
      next: () => {
        this.router.navigate(['/performance']);
      },

      error: (err) => {
        console.error('Failed to save performance:', err);

        this.error =
          err?.error?.message ??
          'Failed to save performance review';

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}