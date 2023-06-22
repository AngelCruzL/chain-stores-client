import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../../features/auth/services/auth.service';
import { catchError } from 'rxjs';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (!token) return router.navigate(['/auth/login']);

  authService
    .checkToken(token)
    .pipe(
      catchError(error => {
        localStorage.removeItem('token');
        router.navigate(['/auth/login']);
        throw new Error(error.error.message);
      }),
    )
    .subscribe(user => {
      localStorage.removeItem('token');
      localStorage.setItem('token', user.token);
      router.navigate(['/admin']);
    });

  return true;
};
