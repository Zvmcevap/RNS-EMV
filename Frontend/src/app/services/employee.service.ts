import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private api = `${API_URL}/employees`;

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  createEmployee(employee: FormData): Observable<any> {
    return this.http.post<any>(this.api, employee);
  }

  updateEmployee(id: string, employee: FormData): Observable<any> {
    return this.http.patch<any>(`${this.api}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}