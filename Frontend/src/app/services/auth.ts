import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${API_URL}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}