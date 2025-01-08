import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@app/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@app/auth/interfaces';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    router.navigate(['/auth/login']);
    return false;
  }

  const decodedToken = jwtDecode<DecodedToken>(token);
  const allowedRoles = route.data['allowedRoles'] as string[];

  if (!allowedRoles.includes(decodedToken.role)) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
