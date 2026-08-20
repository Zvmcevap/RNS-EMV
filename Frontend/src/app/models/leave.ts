import { Employee } from './employee';

export interface Leave {
  _id: string;
  employee: Employee;
  leaveType: 'annual' | 'sick' | 'unpaid' | 'maternity';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}