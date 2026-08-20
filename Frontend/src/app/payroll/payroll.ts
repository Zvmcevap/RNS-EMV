import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollService } from '../services/payroll.service';
import { Payroll } from '../models/payroll';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll.html',
  styleUrls: ['./payroll.css']
})
export class PayrollComponent implements OnInit {

  private payrollService = inject(PayrollService);

  payrolls: Payroll[] = [];
  loading = false;
  error = '';

  ngOnInit(): void {
    this.loadPayrolls();
  }

  loadPayrolls(): void {
    this.loading = true;

    this.payrollService.getAll().subscribe({
      next: (response: any) => {
        this.payrolls = response.data.payrolls;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load payroll records';
        this.loading = false;
      }
    });
  }
}