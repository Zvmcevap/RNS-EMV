import { Employee } from './employee';

export interface Payroll {
  _id: string;
  employee: Employee;
  month: number;
  year: number;
  basicSalary: number;
  bonus: number;
  deductions: number;
  totalSalary: number;
  createdAt?: string;
  updatedAt?: string;
}