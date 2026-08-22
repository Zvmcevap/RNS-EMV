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

import { AttendanceService } from '../../services/attendance.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-attendance-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './attendance-form.html',
  styleUrl: './attendance-form.css'
})
export class AttendanceFormComponent implements OnInit {
  private attendanceService = inject(AttendanceService);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  attendanceId = '';
  isEditMode = false;
  loading = false;
  error = '';

  employees: any[] = [];

  attendance: any = {
    employee: '',
    date: '',
    checkIn: '08:00',
    checkOut: '16:00',
    status: 'present'
  };

  ngOnInit(): void {
    this.attendanceId =
      this.route.snapshot.paramMap.get('id') ?? '';

    this.isEditMode = !!this.attendanceId;

    this.loadEmployees();

    if (this.isEditMode) {
      this.loadAttendance();
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

  loadAttendance(): void {
    this.loading = true;
    this.error = '';

    this.attendanceService
      .getAttendanceById(this.attendanceId)
      .subscribe({
        next: (res: any) => {
          const record = res?.data?.attendance;

          if (record) {
            this.attendance = {
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
          console.error('Failed to load attendance:', err);

          this.error =
            err?.error?.message ??
            'Failed to load attendance';

          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    const request = this.isEditMode
      ? this.attendanceService.updateAttendance(
          this.attendanceId,
          this.attendance
        )
      : this.attendanceService.createAttendance(
          this.attendance
        );

    request.subscribe({
      next: () => {
        this.router.navigate(['/attendance']);
      },

      error: (err) => {
        console.error('Failed to save attendance:', err);

        this.error =
          err?.error?.message ??
          'Failed to save attendance';

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}