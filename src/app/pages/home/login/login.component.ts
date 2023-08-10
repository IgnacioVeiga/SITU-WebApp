import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
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
          localStorage.setItem('authToken', resp.token);
          this.goTo('report-list')
        } else {
          this.toastr.error('Error en el inicio de sesión', 'Intentelo más tarde');
        }
      },
      error: () => {
        this.toastr.error("No se pudo conectar al servidor", 'Intentelo más tarde');
      }
    });

    // TODO: eliminar esto una vez implementado el backend
    this.goTo('report-list')
  }
}
