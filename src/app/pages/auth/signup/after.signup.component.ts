import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  template: `
    <mat-dialog-content>
      <p>¡Gracias por tu interés! Pronto te contactaremos con toda la información que necesitas. ¡Espera nuestro mensaje! 📧📞</p>
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
