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

import { PayrollService } from '../../services/payroll.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-payroll-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './payroll-form.html',
  styleUrl: './payroll-form.css'
})
export class PayrollFormComponent implements OnInit {
  private payrollService = inject(PayrollService);
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  payrollId = '';
  isEditMode = false;
  loading = false;
  error = '';

  employees: any[] = [];

  payroll: any = {
    employee: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    basicSalary: 0,
    bonus: 0,
    deductions: 0,
    totalSalary: 0
  };

  get calculatedTotal(): number {
    const basic = Number(this.payroll.basicSalary) || 0;
    const bonus = Number(this.payroll.bonus) || 0;
    const deductions = Number(this.payroll.deductions) || 0;

    return basic + bonus - deductions;
  }

  ngOnInit(): void {
    this.payrollId =
      this.route.snapshot.paramMap.get('id') ?? '';

    this.isEditMode = !!this.payrollId;

    this.loadEmployees();

    if (this.isEditMode) {
      this.loadPayroll();
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

  loadPayroll(): void {
    this.loading = true;
    this.error = '';

    this.payrollService
      .getById(this.payrollId)
      .subscribe({
        next: (res: any) => {
          const record = res?.data?.payroll;

          if (record) {
            this.payroll = {
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
          console.error('Failed to load payroll:', err);

          this.error =
            err?.error?.message ??
            'Failed to load payroll';

          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  onSubmit(): void {
    this.loading = true;
    this.error = '';

    const payload = {
      ...this.payroll,
      totalSalary: this.calculatedTotal
    };

    const request = this.isEditMode
      ? this.payrollService.update(
          this.payrollId,
          payload
        )
      : this.payrollService.create(payload);

    request.subscribe({
      next: () => {
        this.router.navigate(['/payroll']);
      },

      error: (err) => {
        console.error('Failed to save payroll:', err);

        this.error =
          err?.error?.message ??
          'Failed to save payroll';

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}