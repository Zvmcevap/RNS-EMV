import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);
  private api = `${API_URL}/employees/`;

  getEmployees(): Observable<any> {
    return this.http.get(this.api);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createEmployee(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateEmployee(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
