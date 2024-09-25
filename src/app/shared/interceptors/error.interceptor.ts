import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    authService = inject(AuthService);
    toastr = inject(ToastrService);
    router = inject(Router);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 400 || 401:
                        this.toastr.error('Credenciales invalidas', 'Inicie sesión');
                        break;

                    case 500:
                        this.toastr.error(error.message, 'Problema en el servidor');
                        break;

                    // DEBUG: remove later
                    default:
                        this.toastr.error(error.message, `${error.status}`);
                        break;
                }
                return throwError(() => error);
            })
        );
    }
}
