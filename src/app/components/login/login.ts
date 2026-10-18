import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="login-card">
      <h2>Sign In to Dashboard</h2>
      <form (submit)="onLogin($event)">
        <div class="field">
          <label>Email Address</label>
          <input type="email" [value]="email()" (input)="email.set($any($event.target).value)" placeholder="test@example.com" required />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" [value]="password()" (input)="password.set($any($event.target).value)" placeholder="password123" required />
        </div>
        @if (errorMessage()) {
          <p class="error-msg">{{ errorMessage() }}</p>
        }
        <button type="submit">Login</button>
      </form>
      <p class="switch-link">Don't have an account? <a routerLink="/signup">Sign up</a></p>
    </div>
  `,
  styles: [`
    .login-card { max-width: 400px; margin: 80px auto; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); background: #fff; }
    .field { margin-bottom: 20px; display: flex; flex-direction: column; }
    input { padding: 10px; margin-top: 6px; border: 1px solid #ccc; border-radius: 4px; }
    button { width: 100%; padding: 10px; background: #2563eb; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .error-msg { color: #dc2626; font-size: 14px; margin-bottom: 10px; }
    .switch-link { text-align: center; margin-top: 15px; font-size: 14px; }
  `]
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');
  errorMessage = signal('');

  onLogin(event: Event) {
    event.preventDefault();
    this.authService.login(this.email(), this.password()).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.errorMessage.set(err.message)
    });
  }
}