import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Router } from '@angular/router';
import { ChangePasswordDTO, LogInForm, SessionDTO, SignUpForm } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _session: SessionDTO | null = null;

    private api = inject(ApiClientService);
    private router = inject(Router);

    signup(form: SignUpForm): Observable<string> {
        return this.api.POST<string>('auth/signup', form);
    }

    login(form: LogInForm): void {
        this.api.POST<SessionDTO>('auth/login', form).subscribe({
            next: (session => {
                this._session = session;
                this.router.navigate(['/dashboard'])
            })
        });
    }

    logout(): void {
        this.api.POST<any>('auth/logout', {}).subscribe({
            next: (() => {
                this._session = null;
            })
        });
    }

    updatePassword(form: ChangePasswordDTO): Observable<any> {
        return this.api.POST<any>('auth/password', form)
    }

    public getSession(): Observable<SessionDTO> {
        if (this._session) {
            return of(this._session);
        }

        return this.api.GET<SessionDTO>('auth/get-session').pipe(
            map(session => {
                this._session = session;
                return session;
            })
        );
    }

    public isAuthenticated(): Observable<boolean> {
        return this.getSession().pipe(
            map(session => {
                return (session) ? true : false;
            }),
            catchError(() => {
                return of(false);
            })
        );
    }

}
