import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AfterRegistrationComponent } from 'src/app/dialogs/after-registration/after.registration.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
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
          this.dialog.open(AfterRegistrationComponent).afterClosed()
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
    this.dialog.open(AfterRegistrationComponent).afterClosed()
      .subscribe(() => {
        this.goTo('/home');
      });
  }
}