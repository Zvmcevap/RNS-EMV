import { Employee } from './employee';

export interface Notification {
  _id: string;
  employee: Employee;
  title: string;
  message: string;
  type:
    | 'announcement'
    | 'leave'
    | 'attendance'
    | 'payroll'
    | 'performance'
    | 'general';
  isRead: boolean;
  createdAt?: string;
  updatedAt?: string;
}