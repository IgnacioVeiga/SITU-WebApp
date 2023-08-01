import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private api: ApiService
  ) { }

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(myForm: NgForm) {
    this.api.POST('login', myForm.value).subscribe({
      next: (resp) => {
        // Aquí asumimos que el backend devuelve un token de autorización en 'data.token'
        if (resp && resp.token) {
          // Guardar el token en el local storage
          localStorage.setItem('authToken', resp.token);
          console.log('Login exitoso. Token almacenado en el local storage.');
          // Si está todo OK, redirige a:
          this.goTo('report-list')
        } else {
          console.error('Error en el inicio de sesión. No se recibió el token.');
        }
      },
      error: (err) => {
        console.error('Error en el inicio de sesión:', err);

        // TODO: quitar esto cuando el Backend esté listo
        this.goTo('report-list');
      }
    });
  }
}
