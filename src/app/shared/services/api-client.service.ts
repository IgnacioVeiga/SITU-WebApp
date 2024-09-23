import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly _API_URL: string = environment.API_URL;
  private readonly httpClient = inject(HttpClient);

  GET<T>(endpoint: string, args?: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.get<T>(url, this.createHttpOptions(args)).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  POST<T>(endpoint: string, body: any, args?: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.post<T>(url, body, this.createHttpOptions(args))
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  PUT<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.put<T>(url, body)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  PATCH<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.patch<T>(url, body)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  DELETE<T>(endpoint: string): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.delete<T>(url)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  private createHttpOptions(args?: any): { headers: HttpHeaders, params: HttpParams } {
    const httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams({}),
      withCredentials: true
    };

    if (args) {
      for (const key in args) {
        if (args.hasOwnProperty(key)) {
          httpOptions.params = httpOptions.params.set(key, args[key]);
        }
      }
    }

    return httpOptions;
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage = `Error: ${error.status}, ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
