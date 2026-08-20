import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);
  private api = `${API_URL}/departments`;

  getDepartments(): Observable<any> {
    return this.http.get(this.api);
  }

  getDepartment(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createDepartment(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateDepartment(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}