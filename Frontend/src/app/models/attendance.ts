import { Employee } from './employee';

export interface Attendance {
  _id: string;
  employee: Employee;
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  createdAt?: string;
  updatedAt?: string;
}