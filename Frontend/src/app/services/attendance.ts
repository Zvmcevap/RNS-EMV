import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private http = inject(HttpClient);
  private api = `${API_URL}/attendance`;

  getAttendance(): Observable<any> {
    return this.http.get(this.api);
  }

  getAttendanceById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createAttendance(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateAttendance(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteAttendance(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
