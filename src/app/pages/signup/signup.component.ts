import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  constructor(private router: Router) { }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    // TODO: enviar todo al backend y redirigir a una pantalla con algun mensaje como:
    // "Formulario enviado, revisa tu casilla de correos dentro de 24hs" o similar
    // y un boton de volver a la homepage o login
  }
}