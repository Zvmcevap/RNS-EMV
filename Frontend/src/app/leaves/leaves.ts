import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeaveService } from '../services/leave.service';
import { Leave } from '../models/leave';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css',
})
export class Leaves implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private leaveService = inject(LeaveService);

  leaves: Leave[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.getLeaves();
    this.cdr.detectChanges();
  }

  getLeaves(): void {
    this.loading = true;

    this.leaveService.getLeaves().subscribe({
      next: (res: any) => {
        this.leaves = res.data.leaves;
        this.loading = false;
        this.cdr.detectChanges();
      },

      error: () => {
        this.error = 'Failed to load leave requests.';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  deleteLeave(id: string): void {
    if (!confirm('Delete this leave request?')) return;

    this.leaveService.deleteLeave(id).subscribe({
      next: () => {
        this.getLeaves();
        this.cdr.detectChanges();
      },

      error: () => {
        alert('Delete failed');
        this.cdr.detectChanges();
      },
    });
  }
}
