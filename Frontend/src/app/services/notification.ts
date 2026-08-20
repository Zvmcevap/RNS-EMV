import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private api = `${API_URL}/notifications`;

  getNotifications(): Observable<any> {
    return this.http.get(this.api);
  }

  getNotificationById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createNotification(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateNotification(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
