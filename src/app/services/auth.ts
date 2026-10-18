import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  // Angular Signal for Auth State
  private _isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  public isLoggedIn = this._isLoggedIn.asReadonly();

  login(email: string, pass: string) {
    if (email === 'test@example.com' && pass === 'password123') {
      this._isLoggedIn.set(true);
      localStorage.setItem('token', 'mock-jwt-token-xyz');
      return of({ success: true, token: 'mock-jwt-token-xyz' });
    }
    return throwError(() => new Error('Invalid email or password'));
  }

  signup(name: string, email: string, pass: string) {
    return of({ success: true, message: 'Account registered successfully' });
  }

  logout() {
    this._isLoggedIn.set(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}