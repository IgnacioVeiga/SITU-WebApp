import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class GenericAPIService {
  private readonly _API_URL: string = environment.API_URL + '/api/situ';
  private readonly httpClient = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);

  GET<T>(endpoint: string, args?: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.get<ApiResponse<T>>(url, this.createHttpOptions(args)).pipe(
      map((response) => {
        this.handleSuccess(response);
        return response.data!;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  POST<T>(endpoint: string, body: any, args?: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.post<ApiResponse<T>>(url, body, this.createHttpOptions(args)).pipe(
      map((response) => {
        this.handleSuccess(response);
        return response.data!;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  PUT<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.put<ApiResponse<T>>(url, body).pipe(
      map((response) => {
        this.handleSuccess(response);
        return response.data!;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  PATCH<T>(endpoint: string, body: any): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.patch<ApiResponse<T>>(url, body).pipe(
      map((response) => {
        this.handleSuccess(response);
        return response.data!;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  DELETE<T>(endpoint: string): Observable<T> {
    const url = `${this._API_URL}/${endpoint}`;
    return this.httpClient.delete<ApiResponse<T>>(url).pipe(
      map((response) => {
        this.handleSuccess(response);
        return response.data!;
      }),
      catchError((error) => this.handleError(error))
    );
  }

  private createHttpOptions(args?: any): { headers: HttpHeaders, params: HttpParams } {
    const httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
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
  
  private handleSuccess<T>(response: ApiResponse<T>): void {
    if (response.message) {
      const needsTranslation = /^[A-Z0-9._-]+$/.test(response.message);
      if (needsTranslation) {
        this.translate.get(response.message).subscribe((translatedMessage) => {
          this.toastr.success(translatedMessage);
        });
      }
      else {
        this.toastr.success(response.message);
      }
    }
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
