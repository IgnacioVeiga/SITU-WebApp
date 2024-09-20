import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (_route, _state) => {
    const authService = inject(AuthService);
    const toastr = inject(ToastrService);
    const router = inject(Router);

    // TODO: uncomment and refactor
    // if (authService.requireLogin) {
    //     toastr.error('Credenciales invalidas', 'Inicia sesión');
    //     router.navigate(['/auth/login']);
    //     return false;
    // } else {
        return true;
    // }
};
