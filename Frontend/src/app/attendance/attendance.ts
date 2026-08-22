import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AttendanceService } from '../services/attendance.service';
import { Attendance } from '../models/attendance';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class AttendanceComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private attendanceService = inject(AttendanceService);

  attendances: Attendance[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.getAttendance();
    this.cdr.detectChanges();
  }
  
  getAttendance(): void {
    this.loading = true;
    this.error = '';

    this.attendanceService.getAttendance().subscribe({
      next: (res: any) => {
        console.log('attendance response:', res);

        const rows = res?.data?.attendance;
        this.attendances = Array.isArray(rows) ? rows : [];

        this.loading = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('attendance error:', err);

        this.attendances = [];
        this.error = 'Failed to load attendance records.';
        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  deleteAttendance(id: string): void {
    if (!confirm('Delete this attendance record?')) return;

    this.attendanceService.deleteAttendance(id).subscribe({
      next: () => {
        this.getAttendance();
        this.cdr.detectChanges();
      },

      error: () => {
        alert('Delete failed');
        this.cdr.detectChanges();
      },
    });
  }
}
