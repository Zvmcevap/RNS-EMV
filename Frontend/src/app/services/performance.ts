import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private http = inject(HttpClient);
  private api = `${API_URL}/performance`;

  getPerformances(): Observable<any> {
    return this.http.get(this.api);
  }

  getPerformanceById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createPerformance(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updatePerformance(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deletePerformance(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
