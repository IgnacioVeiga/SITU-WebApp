import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // URL de la API de "json-server"
  private readonly API_URL: string = 'http://localhost:3000';

  // TODO: mejor utilizar cookies
  private authToken = localStorage.getItem('authToken');

  // Encabezado de autorización
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    }),
  };

  constructor(private http: HttpClient) { }

  GET<T>(endpoint: string): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.http.get<T>(url, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  POST<T>(endpoint: string, data: any): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;

    if (endpoint === ('login' || 'signup')) {
      return this.http.post<T>(url, data)
        .pipe(retry(1), catchError(this.errorHandl));
    } else {
      return this.http.post<T>(url, data, this.httpOptions)
        .pipe(retry(1), catchError(this.errorHandl));
    }
  }

  UPDATE<T>(endpoint: string, data: any): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.http.put<T>(url, data, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  DELETE<T>(endpoint: string): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.http.delete<T>(url, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl));
  }

  // Error handling
  errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
