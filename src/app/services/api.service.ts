import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // TODO: Reemplazar con la URL de la API
  private readonly API_URL: string = 'localhost:8080';

  // Token de acceso válido, en un futuro mejor utilizar una cookie para almacenarlo
  private authToken = localStorage.getItem('authToken');

  // Encabezado de autorización
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    }),
  };

  constructor(private http: HttpClient) { }

  GET(endpoint: string): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.http.get(url, this.httpOptions);
  }

  POST(endpoint: string, data: any): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;

    if (endpoint === ('login' || 'signup')) {
      return this.http.post(url, data);
    } else {
      return this.http.post(url, data, this.httpOptions);
    }
  }

  DELETE(endpoint: string): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.http.delete(url, this.httpOptions);
  }

  UPDATE(endpoint: string, data: any): Observable<any> {
    const url = `${this.API_URL}/${endpoint}`;
    return this.http.put(url, data, this.httpOptions);
  }
}
