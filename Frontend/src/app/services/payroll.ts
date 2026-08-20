import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private http = inject(HttpClient);
  private api = `${API_URL}/payroll`;

  getPayrolls(): Observable<any> {
    return this.http.get(this.api);
  }

  getPayrollById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createPayroll(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updatePayroll(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deletePayroll(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
