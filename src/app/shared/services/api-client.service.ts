import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private readonly API_URL: string = '/situ';
  private loginRequired: boolean = false;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
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

  /**
   * Update full object
   */
  PUT<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.httpClient.put<T>(url, body)
      .pipe(
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Update some properties of object
   */
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
    const timestamp = new Date().toISOString();
    const requestMethod = error.url?.split('/').pop(); // Extract the last part of the URL
    let idx = 0;
    if (error.url) {
      idx = error.url.lastIndexOf(this.API_URL) + this.API_URL.length;
    }
    const endpoint = error.url?.substring(idx, error.url?.length - 1);
    const errorMessage = {
      timestamp: timestamp,
      method: requestMethod,
      endpoint: endpoint,
      status: error.status,
      statusText: error.statusText,
      message: error.error.message || 'An error occurred',
      details: error.error.details || ''
    };
    const message = JSON.stringify(errorMessage, null, 2);

    // Send the error to a centralized logging service
    this.logErrorToService(message);

    if (error.status === 401) {
      this.loginRequired = true;
      this.router.navigate(['/login']);
    }

    return throwError(() => new Error('Problems processing the request'));
  }


  private logErrorToService(errorMessage: string) {
    // Implement sending the error message to your logging service
    console.log(errorMessage);
  }
}
