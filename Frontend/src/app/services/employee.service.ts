import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);
  private api = `${API_URL}/employees`;

  private getAuthOptions() {
    let token = localStorage.getItem('token');

    if (!token) {
      const userObj = localStorage.getItem('user');
      if (userObj) {
        try {
          const parsedUser = JSON.parse(userObj);
          token = parsedUser.token || parsedUser.jwt || null;
        } catch (e) {
          console.error("Failed to parse user object from localStorage", e);
        }
      }
    }

    if (token) {
      return {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
    }
    
    return {}; 
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  getEmployee(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  createEmployee(employee: FormData): Observable<any> {
    return this.http.post<any>(this.api, employee, this.getAuthOptions());
  }

  updateEmployee(id: string, employee: FormData): Observable<any> {
    return this.http.patch<any>(`${this.api}/${id}`, employee, this.getAuthOptions());
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`, this.getAuthOptions());
  }
}