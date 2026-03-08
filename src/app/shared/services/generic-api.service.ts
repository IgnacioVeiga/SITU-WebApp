import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { MockApiService } from './mock-api.service';

type BackendResponse<T> = ApiResponse<T> | T;
type HttpQueryValue = string | number | boolean | null | undefined;
type HttpQueryParams = Record<string, HttpQueryValue>;

@Injectable({
  providedIn: 'root',
})
export class GenericAPIService {
  private readonly apiBaseUrl = (environment.apiBaseUrl ?? '').replace(/\/+$/, '');
  private readonly httpClient = inject(HttpClient);
  private readonly toastr = inject(ToastrService);
  private readonly translate = inject(TranslateService);
  private readonly mockApiService = inject(MockApiService);

  GET<T>(endpoint: string, args?: HttpQueryParams): Observable<T> {
    if (environment.useMockApi) {
      return this.executeRequest(() => this.mockApiService.GET<T>(endpoint, args));
    }

    return this.executeRequest(() => this.httpClient.get<BackendResponse<T>>(this.buildUrl(endpoint), this.createHttpOptions(args)));
  }

  POST<T>(endpoint: string, body: unknown, args?: HttpQueryParams): Observable<T> {
    if (environment.useMockApi) {
      return this.executeRequest(() => this.mockApiService.POST<T>(endpoint, body));
    }

    return this.executeRequest(() => this.httpClient.post<BackendResponse<T>>(this.buildUrl(endpoint), body, this.createHttpOptions(args)));
  }

  PUT<T>(endpoint: string, body: unknown, args?: HttpQueryParams): Observable<T> {
    if (environment.useMockApi) {
      return this.executeRequest(() => this.mockApiService.PUT<T>(endpoint, body));
    }

    return this.executeRequest(() => this.httpClient.put<BackendResponse<T>>(this.buildUrl(endpoint), body, this.createHttpOptions(args)));
  }

  PATCH<T>(endpoint: string, body: unknown, args?: HttpQueryParams): Observable<T> {
    if (environment.useMockApi) {
      return this.executeRequest(() => this.mockApiService.PATCH<T>(endpoint, body));
    }

    return this.executeRequest(() => this.httpClient.patch<BackendResponse<T>>(this.buildUrl(endpoint), body, this.createHttpOptions(args)));
  }

  DELETE<T>(endpoint: string, args?: HttpQueryParams): Observable<T> {
    if (environment.useMockApi) {
      return this.executeRequest(() => this.mockApiService.DELETE<T>(endpoint));
    }

    return this.executeRequest(() => this.httpClient.delete<BackendResponse<T>>(this.buildUrl(endpoint), this.createHttpOptions(args)));
  }

  private executeRequest<T>(requestFactory: () => Observable<BackendResponse<T>>): Observable<T> {
    return requestFactory().pipe(
      map((response) => {
        this.handleSuccess(response);
        return this.unwrapResponse(response);
      })
    );
  }

  private createHttpOptions(args?: HttpQueryParams): { params: HttpParams; withCredentials: boolean } {
    const httpOptions = {
      params: new HttpParams(),
      withCredentials: true
    };

    for (const [key, value] of Object.entries(args ?? {})) {
      if (value !== null && value !== undefined) {
        httpOptions.params = httpOptions.params.set(key, String(value));
      }
    }

    return httpOptions;
  }

  private handleSuccess<T>(response: BackendResponse<T>): void {
    if (!this.isApiResponse(response) || !response.message) {
      return;
    }

    const needsTranslation = /^[A-Z0-9._-]+$/.test(response.message);
    if (needsTranslation) {
      this.translate.get(response.message).subscribe((translatedMessage) => {
        this.toastr.success(translatedMessage);
      });
    } else {
      this.toastr.success(response.message);
    }
  }

  private unwrapResponse<T>(response: BackendResponse<T>): T {
    if (!response) {
      return null as T;
    }

    if (this.isApiResponse(response)) {
      return (response.data ?? null) as T;
    }
    return response as T;
  }

  private isApiResponse<T>(response: BackendResponse<T>): response is ApiResponse<T> {
    return typeof response === 'object'
      && response !== null
      && 'message' in response
      && 'data' in response;
  }

  private buildUrl(endpoint: string): string {
    if (/^https?:\/\//i.test(endpoint)) {
      return endpoint;
    }

    const sanitizedEndpoint = endpoint.replace(/^\/+/, '');
    return `${this.apiBaseUrl}/${sanitizedEndpoint}`;
  }
}
