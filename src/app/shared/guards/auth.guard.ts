import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (_route, _state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.isAuthenticated().pipe(
        tap(isAuthenticated => {
            if (!isAuthenticated) {
                authService.logout();
                router.navigate(['/auth/login']);
                return false;
            }
            return true;
        })
    );
};
