import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;

  login(email: string, password: string): Observable<boolean> {
    // Implementasi login yang sebenarnya
    // Misalnya, memverifikasi email dan password dengan server
    if (email === 'test@example.com' && password === 'password') {
      this.authenticated = true;
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    this.authenticated = false;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
