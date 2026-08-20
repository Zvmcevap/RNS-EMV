import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private api = `${API_URL}/users`;

  getAll(): Observable<any> {
    return this.http.get(this.api);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  update(id: string, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}