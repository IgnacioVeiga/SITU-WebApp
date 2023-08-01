import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AfterRegistrationComponent } from 'src/app/dialogs/after-registration/after.registration.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private api: ApiService
  ) { }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  onSubmit(myForm: NgForm) {
    this.api.POST('signup', myForm.value).subscribe({
      next: (resp) => {
        if (resp) {
          console.log('Formulario de inscripción enviado con exito.');
          this.dialog.open(AfterRegistrationComponent).afterClosed()
            .subscribe(() => {
              this.goTo('/home');
            });

        } else {
          console.error('Error, no se recibió respuesta del servidor.');
        }
      },
      error: (err) => {
        console.error('Error:', err);

        // TODO: quitar esto cuando el Backend esté listo
        this.dialog.open(AfterRegistrationComponent).afterClosed()
          .subscribe(() => {
            this.goTo('/home');
          });
      }
    });
    const dialogRef = this.dialog.open(AfterRegistrationComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.goTo('/home');
    });
  }
}