import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (_route, _state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toastr = inject(ToastrService);

    return authService.isAuthenticated().pipe(
        tap(isAuthenticated => {
            if (!isAuthenticated) {
                router.navigate(['/auth/login']);
                toastr.error('Inicia sesión', 'Sesión expirada');
            }
        })
    );
};
