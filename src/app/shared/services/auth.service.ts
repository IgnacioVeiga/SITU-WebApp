import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Router } from '@angular/router';
import { LogInForm } from '../models/auth.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TABLE_NAME = 'auth';

    constructor(private api: ApiClientService, private router: Router) { }

    login(form: LogInForm): Observable<void> {
        return this.api.POST<void>(`${this.TABLE_NAME}/login`, form);
    }

    signup(form: any): Observable<string> {
        return this.api.POST<any>(`${this.TABLE_NAME}/signup`, form);
    }
    
    logout(): void {
        this.api.POST<any>(`${this.TABLE_NAME}/logout`, {}).subscribe(() => {
            this.router.navigate(['/home']);
        });
    }
}
