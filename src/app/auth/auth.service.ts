import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, tap } from 'rxjs';

interface LoginParams {
  email: string;
  password: string;
}

interface User {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private coockieService = inject(CookieService);

  private readonly baseUrl = 'http://localhost:3000';

  login(params: LoginParams): Observable<User> {
    const url = `${this.baseUrl}/api/v1/auth/login`;
    const body = { user: { email: params.email, password: params.password } };
    const expirationDate = new Date();

    expirationDate.setHours(14, 21, 0, 0);

    return this.http.post<User>(url, body).pipe(
      tap((response) => {
        this.coockieService.set('token', response.token, expirationDate);
        console.log('User logged in', response);
      }),
      catchError((error) => {
        console.error('Error logging in', error);
        throw error;
      }),
    );
  }
}
