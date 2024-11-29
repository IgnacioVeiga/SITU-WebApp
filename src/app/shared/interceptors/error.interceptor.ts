import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private toastr = inject(ToastrService);
    private router = inject(Router);
    private translate = inject(TranslateService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                const { status, error: errorBody } = error;
                // TODO: move, don't show all error messages here
                if (errorBody && errorBody.message) {
                    const messageKey = errorBody.message;
                    const needsTranslation = /^[A-Z0-9._-]+$/.test(messageKey);

                    if (needsTranslation) {
                        this.translate.get(messageKey).subscribe((translatedMessage) => {
                            this.toastr.error(translatedMessage);
                        });
                    } else {
                        this.toastr.error(messageKey, 'Error');
                    }
                } else {
                    this.translate.get('ERRORS.GENERIC').subscribe((translatedMessage) => {
                        this.toastr.error(translatedMessage);
                    });
                }

                // may be unnecesary
                if (status === 401) {
                    this.router.navigate(['/auth/login']);
                }

                return throwError(() => error);
            })
        );
    }

}
