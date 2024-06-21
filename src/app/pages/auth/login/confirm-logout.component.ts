import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  template: `
    <h1 mat-dialog-title>Cerrar sesión</h1>
    <div mat-dialog-content>
      ¿Salir de la aplicación?
    </div>
    <mat-dialog-actions align="center">
      <button mat-raised-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>Salir</button>
      <button mat-raised-button color="secondary" mat-dialog-close>Cancelar</button>
    </mat-dialog-actions>
`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ]
})
export class ConfirmLogoutComponent { }
