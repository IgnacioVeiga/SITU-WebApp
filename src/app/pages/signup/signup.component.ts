import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AfterRegistrationComponent } from 'src/app/dialogs/after-registration/after.registration.component';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  constructor(public dialog: MatDialog, private router: Router) { }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    // TODO: enviar todo al backend y redirigir a una pantalla con algun mensaje como:
    // "Formulario enviado, revisa tu casilla de correos dentro de 24hs" o similar
    // y un boton de volver a la homepage o login
    const dialogRef = this.dialog.open(AfterRegistrationComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.goTo('/home');
    });
  }
}