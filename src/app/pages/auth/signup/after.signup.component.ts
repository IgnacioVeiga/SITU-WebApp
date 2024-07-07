import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  template: `
    <mat-dialog-content>
      <p>¡Gracias por registrarte! Te enviamos tu contraseña temporal al email que registraste,
        te recomendamos que la modifiques cuanto antes para mayor seguridad.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-raised-button color="primary" mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ]
})
export class AfterSignUpComponent { }
