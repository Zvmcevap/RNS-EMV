import { Employee } from './employee';

export interface Performance {
  _id: string;
  employee: Employee;
  reviewDate: string;
  reviewer: string;
  score: number;
  goals: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}