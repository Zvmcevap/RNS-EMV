import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private http = inject(HttpClient);
  private api = `${API_URL}/leaves`;

  getLeaves(): Observable<any> {
    return this.http.get(this.api);
  }

  getLeaveById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createLeave(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateLeave(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteLeave(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
