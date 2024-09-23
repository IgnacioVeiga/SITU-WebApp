import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    authService = inject(AuthService);
    toastr = inject(ToastrService);
    router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.toastr.error('Tu sesión ha expirado', 'Sesión expirada');
                    this.authService.logout();
                    this.router.navigate(['/auth/login']);
                } else {
                    this.toastr.error('Ocurrió un error inesperado', `Error ${error.status}`);
                }
                return throwError(() => error);

            })
        );
    }
}
