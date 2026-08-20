import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformanceService } from '../services/performance.service';
import { Performance } from '../models/performance';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './performance.html',
  styleUrls: ['./performance.css']
})
export class PerformanceComponent implements OnInit {

  private performanceService = inject(PerformanceService);

  performances: Performance[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadPerformances();
  }

  loadPerformances(): void {
    this.loading = true;

    this.performanceService.getAll().subscribe({
      next: (response: any) => {
        this.performances = response.data.performances;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load performance reviews';
        this.loading = false;
      }
    });
  }

}