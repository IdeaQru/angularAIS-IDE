import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://165.154.208.232:3000/api'; // Sesuaikan dengan URL backend Anda

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Mengembalikan true jika token ada di localStorage
  }

  getUserName(): string {
    return localStorage.getItem('userName') || '';
  }
  saveUserName(userName: string): void {
    localStorage.setItem('userName', userName);
  }
}
