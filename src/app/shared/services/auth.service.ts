import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { GenericAPIService } from './generic-api.service';
import { ChangePasswordDTO, LogInForm, SessionDTO, SignUpForm } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private session: SessionDTO | null = null;

  private readonly api = inject(GenericAPIService);

  signup(form: SignUpForm): Observable<void> {
    return this.api.POST<void>('auth/signup', form);
  }

  login(form: LogInForm): Observable<void> {
    return this.api.POST<SessionDTO>('auth/login', form).pipe(
      map((resp) => {
        this.session = resp;
      })
    );
  }

  logout(): void {
    this.api.POST<void>('auth/logout', {}).subscribe({
      next: () => this.clearLocalSession(),
      error: () => this.clearLocalSession()
    });
  }

  clearLocalSession(): void {
    this.session = null;
  }

  updatePassword(form: ChangePasswordDTO): Observable<void> {
    return this.api.POST<void>('auth/password', form);
  }

  getSession(): Observable<SessionDTO | null> {
    if (this.session) {
      return of(this.session);
    }

    return this.api.GET<SessionDTO>('auth/session').pipe(
      map((resp) => {
        this.session = resp;
        return resp;
      })
    );
  }

  getSessionSnapshot(): SessionDTO | null {
    return this.session;
  }

  isAuthenticated(): Observable<boolean> {
    return this.getSession().pipe(
      map((session) => !!session),
      catchError(() => of(false))
    );
  }
}
