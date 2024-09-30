import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, tap } from 'rxjs';
import { DecodedToken } from './interfaces';
import { Router } from '@angular/router';
import {
  UserLoginParams,
  UserLoginResponse,
} from './interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cookieService = inject(CookieService);
  private http = inject(HttpClient);
  private router = inject(Router);
  isAuthenticated$ = computed(() => this.isAuthenticated());
  private isAuthenticated = signal<boolean>(false);
  private readonly baseUrl = 'http://localhost:3000';

  constructor() {
    this.checkToken();
  }

  login(params: UserLoginParams): Observable<void> {
    const url = `${this.baseUrl}/api/v1/auth/login`;
    const body = {
      user: { email: params.email, password: params.password },
    };
    return this.http.post<UserLoginResponse>(url, body).pipe(
      tap((response) => {
        this.setTokenInCookie(response.data.user.token);
        this.isAuthenticated.set(true);
        console.log('User logged in', response);
      }),
      catchError((error) => {
        console.error('Error logging in', error);
        throw error;
      }),
      map(() => void 0),
    );
  }

  initiateLogout(): Observable<void> {
    const url = `${this.baseUrl}/api/v1/auth/logout`;
    return this.http.delete<void>(url).pipe(
      tap(() => {
        this.completeLogout();
      }),
      catchError((error) => {
        this.completeLogout();
        throw error;
      }),
    );
  }

  completeLogout(): void {
    this.cookieService.delete('token', '/');
    this.isAuthenticated.set(false);
    this.router.navigate(['/auth/login']);
    console.log('User logged out');
  }

  checkToken(): boolean {
    const token = this.cookieService.get('token');
    if (token) {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const isValid = decodedToken.exp * 1000 > Date.now();
      this.isAuthenticated.set(isValid);
      return isValid;
    }
    this.isAuthenticated.set(false);
    return false;
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  private setTokenInCookie(token: string): void {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    this.cookieService.set('token', token, expirationDate, '/');
  }
}
