import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Reemplaza con la URL de tu API
  private apiUrl = 'https://tu-api.com';

  // Reemplaza con el token de acceso válido, en un futuro mejor utilizar una cookie
  private authToken = localStorage.getItem('authToken');

  constructor(private http: HttpClient) { }

  // Método para realizar una petición GET a la API con encabezados de autenticación
  get(endpoint: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`, // Agregamos el encabezado de autorización
      }),
    };

    return this.http.get(`${this.apiUrl}/${endpoint}`, httpOptions);
  }

  // Método para realizar una petición POST a la API con encabezados de autenticación
  post(endpoint: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`, // Agregamos el encabezado de autorización
      }),
    };

    return this.http.post(`${this.apiUrl}/${endpoint}`, data, httpOptions);
  }

  // Método para realizar una petición DELETE a la API con encabezados de autenticación
  delete(endpoint: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`, // Agregamos el encabezado de autorización
      }),
    };

    return this.http.delete(`${this.apiUrl}/${endpoint}`, httpOptions);
  }

  // Método para realizar una petición PUT a la API con encabezados de autenticación
  update(endpoint: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`, // Agregamos el encabezado de autorización
      }),
    };

    return this.http.put(`${this.apiUrl}/${endpoint}`, data, httpOptions);
  }
}
