import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap } from 'rxjs';
import { DecodedToken, LoginParams, User } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);
  private readonly baseUrl = 'http://localhost:3000';
  private isAuthenticated = signal<boolean>(false);
  isAuthenticated$ = computed(() => this.isAuthenticated);

  constructor() {
    this.checkToken();
  }

  login(params: LoginParams): Observable<User> {
    const url = `${this.baseUrl}/api/v1/auth/login`;
    const body = { user: { email: params.email, password: params.password } };

    return this.http.post<User>(url, body).pipe(
      tap((response) => {
        this.setTokenInCookie(response.token);
        console.log('User logged in', response);
      }),
      catchError((error) => {
        console.error('Error logging in', error);
        throw error;
      }),
    );
  }

  logout(): void {
    this.cookieService.delete('token');
    this.isAuthenticated.set(false);
    console.log('User logged out');
  }

  checkToken(): boolean {
    const token = this.cookieService.get('token');
    if (!token) {
      this.isAuthenticated.set(false);
      return false;
    }
    const decodedToken = jwtDecode<DecodedToken>(token);
    const isValid = decodedToken.exp * 1000 > Date.now();
    this.isAuthenticated.set(isValid);
    return isValid;
  }

  getToken(): string | null {
    return this.cookieService.get('token') || null;
  }

  private setTokenInCookie(token: string): void {
    const decodedToken = jwtDecode<DecodedToken>(token);
    const expirationDate = new Date(decodedToken.exp * 1000);
    this.cookieService.set('token', token, expirationDate);
  }
}
