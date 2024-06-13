import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7075/api/Authentication';
  private tokenKey = 'auth-token';

  constructor(private httpClient: HttpClient, private router: Router) { }
  login(userModel: User): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/login`, userModel);
  }
  signup(userModel: User): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`, userModel);
    // return this.http.post<any>(`${this.apiUrl}/signup`, { email, password });
  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null ? true : false;
  }
}
