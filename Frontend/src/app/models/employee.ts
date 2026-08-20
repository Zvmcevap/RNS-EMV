export interface Employee {
  _id: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  jobTitle: string;
  department: string;

  salary: number;
  hireDate: string;

  status: 'active' | 'inactive';

  imageURL?: string;

  createdAt?: string;
  updatedAt?: string;
}