import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiClientService } from './api-client.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TABLE_NAME = 'auth';

    constructor(private api: ApiClientService) { }

    login(email: string, password: string): Observable<any> {
        return this.api.POST<any>(`${this.TABLE_NAME}/login`, { email, password })
            .pipe(
                tap(response => {
                    if (response && response.token) {
                        this.saveToken(response.token);
                    }
                })
            );
    }

    saveToken(token: string): void {
        localStorage.setItem('authToken', token);
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    logout(): void {
        localStorage.removeItem('authToken');
    }
}
