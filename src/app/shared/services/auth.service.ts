import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Router } from '@angular/router';
import { LogInForm, SessionDTO, SignUpForm } from '../models/auth.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TABLE_NAME = 'auth';
    private _session: SessionDTO | null = null;

    private api = inject(ApiClientService);
    private toastr = inject(ToastrService);
    private router = inject(Router);

    login(form: LogInForm): void {
        this.api.POST<SessionDTO>(`${this.TABLE_NAME}/login`, form).subscribe({
            next: (session) => {
                this._session = session;
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.toastr.error(err);
            }
        });
    }

    signup(form: SignUpForm): Observable<string> {
        return this.api.POST<string>(`${this.TABLE_NAME}/signup`, form);
    }

    logout(): void {
        this.api.POST<any>(`${this.TABLE_NAME}/logout`, {}).subscribe({
            next: () => {
                this._session = null;
                this.router.navigate(['/home']);
            }
        });
    }

    public getSession(): Observable<SessionDTO> {
        if (this._session) {
            return of(this._session);
        }

        return this.api.GET<SessionDTO>(`${this.TABLE_NAME}/get-session`).pipe(
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
