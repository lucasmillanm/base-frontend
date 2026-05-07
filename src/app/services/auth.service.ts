import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiUrl;

  isLoggedIn = signal(!!localStorage.getItem('token'));

  register(email: string, username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/register`, { email, username, password }).pipe(
      tap(res => this.saveToken(res))
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/api/auth/login`, { email, password }).pipe(
      tap(res => this.saveToken(res))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private saveToken(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    this.isLoggedIn.set(true);
  }
}
