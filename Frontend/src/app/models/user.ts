export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'employee';
  phone?: string;
  imageURL?: string;
  createdAt?: string;
  updatedAt?: string;
}