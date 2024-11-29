import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { GenericAPIService } from './generic-api.service';
import { ChangePasswordDTO, LogInForm, SessionDTO, SignUpForm } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _session: SessionDTO | null = null;

    private api = inject(GenericAPIService);

    // TODO: don't use "any"
    signup(form: SignUpForm): Observable<any> {
        return this.api.POST<any>('auth/signup', form);
    }

    login(form: LogInForm): Observable<void> {
        return this.api.POST<SessionDTO>('auth/login', form).pipe(
            map(resp => {
                this._session = resp;
            })
        );
    }

    logout(): void {
        this.api.POST<any>('auth/logout', {}).subscribe({
            next: () => this._session = null,
            error: () => this._session = null
        });
    }

    updatePassword(form: ChangePasswordDTO): Observable<any> {
        return this.api.POST<any>('auth/password', form);
    }

    getSession(): Observable<SessionDTO | null> {
        if (this._session) {
            return of(this._session);
        }

        return this.api.GET<SessionDTO>('auth/session').pipe(
            map(resp => {
                this._session = resp;
                return resp;
            })
        );
    }

    isAuthenticated(): Observable<boolean> {
        return this.getSession().pipe(
            map(session => !!session),
            catchError(() => of(false))
        );
    }
}
