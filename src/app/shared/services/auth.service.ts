import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { AuthTokenPayload, ChangePasswordDTO, LogInForm, SessionDTO, SignUpForm } from '../models/auth.model';
import { GenericAPIService } from './generic-api.service';

interface AuthSession {
  tokenType: string;
  accessToken: string;
  expiresAt: string;
  session: SessionDTO;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSession: AuthSession | null = null;
  private readonly api = inject(GenericAPIService);

  signup(form: SignUpForm): Observable<void> {
    return this.api.POST<void>('auth/signup', form);
  }

  login(form: LogInForm): Observable<void> {
    return this.api.POST<AuthTokenPayload>('auth/login', form).pipe(
      map((payload) => {
        this.setSessionFromPayload(payload);
      })
    );
  }

  refreshSession(): Observable<AuthSession> {
    return this.api.POST<AuthTokenPayload>('auth/refresh', {}).pipe(
      map((payload) => this.setSessionFromPayload(payload))
    );
  }

  logout(): void {
    this.api.POST<void>('auth/logout', {}).subscribe({
      next: () => this.clearLocalSession(),
      error: () => this.clearLocalSession()
    });
  }

  clearLocalSession(): void {
    this.authSession = null;
  }

  updatePassword(form: ChangePasswordDTO): Observable<void> {
    return this.api.POST<void>('auth/password', form);
  }

  getSession(): Observable<SessionDTO | null> {
    const currentSession = this.getValidAuthSession();
    if (currentSession) {
      return of(currentSession.session);
    }

    return this.refreshSession().pipe(
      map((session) => session.session),
      catchError(() => of(null))
    );
  }

  getSessionSnapshot(): SessionDTO | null {
    return this.getValidAuthSession()?.session ?? null;
  }

  getAccessToken(): string | null {
    return this.getValidAuthSession()?.accessToken ?? null;
  }

  isAuthenticated(): Observable<boolean> {
    return this.getSession().pipe(
      map((session) => !!session),
      catchError(() => of(false))
    );
  }

  private setSessionFromPayload(payload: AuthTokenPayload): AuthSession {
    this.authSession = {
      tokenType: payload.tokenType,
      accessToken: payload.accessToken,
      expiresAt: payload.expiresAt,
      session: payload.session
    };

    const validSession = this.getValidAuthSession();
    if (!validSession) {
      throw new Error('Invalid auth token expiration');
    }
    return validSession;
  }

  private getValidAuthSession(): AuthSession | null {
    if (!this.authSession) {
      return null;
    }

    const expiresAtMs = Date.parse(this.authSession.expiresAt);
    if (Number.isNaN(expiresAtMs) || expiresAtMs <= Date.now()) {
      this.clearLocalSession();
      return null;
    }

    return this.authSession;
  }
}
