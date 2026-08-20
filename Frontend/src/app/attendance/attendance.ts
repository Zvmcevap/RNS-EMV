import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AttendanceService } from '../services/attendance.service';
import { Attendance } from '../models/attendance';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class AttendanceComponent implements OnInit {

  private attendanceService = inject(AttendanceService);

  attendances: Attendance[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.getAttendance();
  }

  getAttendance(): void {

    this.loading = true;

    this.attendanceService.getAttendance().subscribe({

      next: (res: any) => {

        this.attendances = res.data.attendances;
        this.loading = false;

      },

      error: () => {

        this.error = 'Failed to load attendance records.';
        this.loading = false;

      }

    });

  }

  deleteAttendance(id: string): void {

    if (!confirm('Delete this attendance record?')) return;

    this.attendanceService.deleteAttendance(id).subscribe({

      next: () => {

        this.getAttendance();

      },

      error: () => {

        alert('Delete failed');

      }

    });

  }

}