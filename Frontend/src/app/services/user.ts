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

  getUsers(): Observable<any> {
    return this.http.get(this.api);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.api, data);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.patch(`${this.api}/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
