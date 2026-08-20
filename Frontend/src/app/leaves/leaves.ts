import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LeaveService } from '../services/leave.service';
import { Leave } from '../models/leave';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaves.html',
  styleUrl: './leaves.css'
})
export class Leaves implements OnInit {

  private leaveService = inject(LeaveService);

  leaves: Leave[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.getLeaves();
  }

  getLeaves(): void {

    this.loading = true;

    this.leaveService.getLeaves().subscribe({

      next: (res: any) => {

        this.leaves = res.data.leaves;
        this.loading = false;

      },

      error: () => {

        this.error = 'Failed to load leave requests.';
        this.loading = false;

      }

    });

  }

  deleteLeave(id: string): void {

    if (!confirm('Delete this leave request?')) return;

    this.leaveService.deleteLeave(id).subscribe({

      next: () => {

        this.getLeaves();

      },

      error: () => {

        alert('Delete failed');

      }

    });

  }

}