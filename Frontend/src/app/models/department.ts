export interface Department {
  _id: string;
  name: string;
  description: string;
  manager: string;
  location: string;
  employeesCount: number;
  createdAt?: string;
  updatedAt?: string;
}