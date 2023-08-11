import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule
  ]
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
