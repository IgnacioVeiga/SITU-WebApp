import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

const AUTH_ENDPOINTS = ['/auth/login', '/auth/signup', '/auth/refresh', '/auth/logout'];
const RETRY_MARKER_HEADER = 'x-auth-refresh-retry';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly apiBaseUrl = (environment.apiBaseUrl ?? '').replace(/\/+$/, '');

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isApiRequest = request.url.startsWith(this.apiBaseUrl);
    const isAuthRequest = AUTH_ENDPOINTS.some((endpoint) => request.url.endsWith(endpoint));

    let requestWithAuth = isApiRequest && !request.withCredentials
      ? request.clone({ withCredentials: true })
      : request;

    const accessToken = this.authService.getAccessToken();
    if (accessToken && isApiRequest && !isAuthRequest) {
      requestWithAuth = requestWithAuth.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(requestWithAuth).pipe(
      catchError((error: HttpErrorResponse) => {
        const alreadyRetried = requestWithAuth.headers.has(RETRY_MARKER_HEADER);

        if (error.status === 401 && isApiRequest && !isAuthRequest && !alreadyRetried) {
          return this.authService.refreshSession().pipe(
            switchMap(() => {
              const refreshedToken = this.authService.getAccessToken();
              if (!refreshedToken) {
                this.authService.clearLocalSession();
                void this.router.navigate(['/auth/login']);
                return throwError(() => error);
              }

              const retriedRequest = requestWithAuth.clone({
                setHeaders: {
                  Authorization: `Bearer ${refreshedToken}`,
                  [RETRY_MARKER_HEADER]: '1'
                }
              });

              return next.handle(retriedRequest);
            }),
            catchError(() => {
              this.authService.clearLocalSession();
              void this.router.navigate(['/auth/login']);
              return throwError(() => error);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
