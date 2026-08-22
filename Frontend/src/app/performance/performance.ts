import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceService } from '../services/performance.service';
import { Performance } from '../models/performance';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.html',
  styleUrls: ['./performance.css'],
})
export class PerformanceComponent implements OnInit {
  private performanceService = inject(PerformanceService);
  private cdr = inject(ChangeDetectorRef);

  performances: Performance[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadPerformances();
    this.cdr.detectChanges();
  }

  loadPerformances(): void {
    this.loading = true;

    this.performanceService.getAll().subscribe({
      next: (response: any) => {
        this.performances = response.data.performances;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load performance reviews';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
