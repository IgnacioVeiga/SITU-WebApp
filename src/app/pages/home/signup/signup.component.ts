import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { AfterSignUpComponent } from 'src/app/pages/home/signup/after.signup.component';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ]
})
export class SignupComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private api: ApiService
  ) { }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  onSubmit(myForm: NgForm) {
    this.api.POST('signup', myForm.value).subscribe({
      next: (resp) => {
        if (resp) {
          console.log();
          this.toastr.success('Formulario de inscripción enviado con exito.', 'Espere respuesta vía email.');
          this.dialog.open(AfterSignUpComponent).afterClosed()
            .subscribe(() => {
              this.goTo('/home');
            });

        } else {
          this.toastr.error('No se recibió respuesta del servidor', 'Intentelo más tarde');
        }
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });

    // TODO: eliminar esto una vez implementado el backend
    this.dialog.open(AfterSignUpComponent).afterClosed()
      .subscribe(() => {
        this.goTo('/home');
      });
  }
}