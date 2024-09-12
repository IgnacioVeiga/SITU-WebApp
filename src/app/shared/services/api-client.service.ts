import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly API_URL: string = environment.API_URL;

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  GET<T>(endpoint: string, args?: any): Observable<T> {
    const url = `${this.API_URL}/${endpoint}`;
    const httpOptions = {
      params: new HttpParams(),
      headers: new HttpHeaders({})
    };

    if (args) {
      for (const key in args) {
        if (args.hasOwnProperty(key)) {
          httpOptions.params = httpOptions.params.set(key, args[key]);
        }
      }
    }

    return this.httpClient.get<T>(url, httpOptions)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  POST<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.httpClient.post<T>(url, body)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  PUT<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.httpClient.put<T>(url, body)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  PATCH<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.httpClient.patch<T>(url, body)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  DELETE<T>(endpoint: string): Observable<T> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.httpClient.delete<T>(url)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse) {   
    const errorMessage = `Error: ${error.status}, ${error.message}`;
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
