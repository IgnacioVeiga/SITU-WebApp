import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private readonly toastr = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly authService = inject(AuthService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const { status, error: errorBody } = error;

        if (status === 401) {
          this.authService.clearLocalSession();
          if (!this.router.url.startsWith('/auth')) {
            this.router.navigate(['/auth/login']);
          }
        }

        if (errorBody && errorBody.message) {
          this.translate.get(errorBody.message).subscribe((translatedMessage) => {
            this.toastr.error(translatedMessage);
          });
        } else {
          this.translate.get('ERRORS.GENERIC').subscribe((translatedMessage) => {
            this.toastr.error(translatedMessage);
          });
        }

        return throwError(() => error);
      })
    );
  }
}
