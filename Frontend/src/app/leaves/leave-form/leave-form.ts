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

import { LeaveService } from '../../services/leave.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-leave-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './leave-form.html',
  styleUrl: './leave-form.css'
})
export class LeaveFormComponent implements OnInit {
  private leaveService = inject(LeaveService);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  leaveId = '';
  isEditMode = false;
  loading = false;
  error = '';

  employees: any[] = [];

  leave: any = {
    employee: '',
    leaveType: 'annual',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'pending'
  };

  ngOnInit(): void {
    this.leaveId =
      this.route.snapshot.paramMap.get('id') ?? '';

    this.isEditMode = !!this.leaveId;

    this.loadEmployees();

    if (this.isEditMode) {
      this.loadLeave();
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

  loadLeave(): void {
    this.loading = true;
    this.error = '';

    this.leaveService
      .getLeaveById(this.leaveId)
      .subscribe({
        next: (res: any) => {
          const record = res?.data?.leave;

          if (record) {
            this.leave = {
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
          console.error('Failed to load leave:', err);

          this.error =
            err?.error?.message ??
            'Failed to load leave request';

          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    const request = this.isEditMode
      ? this.leaveService.updateLeave(
          this.leaveId,
          this.leave
        )
      : this.leaveService.createLeave(
          this.leave
        );

    request.subscribe({
      next: () => {
        this.router.navigate(['/leaves']);
      },

      error: (err) => {
        console.error('Failed to save leave:', err);

        this.error =
          err?.error?.message ??
          'Failed to save leave request';

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}