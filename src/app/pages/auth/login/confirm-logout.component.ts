import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `
    <h1 mat-dialog-title>{{'LOGOUT_QUESTION' | translate}}</h1>
    <mat-dialog-actions align="center">
      <button mat-raised-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>{{'LOGOUT' | translate}}</button>
      <button mat-raised-button color="secondary" mat-dialog-close>{{'CANCEL' | translate}}</button>
    </mat-dialog-actions>
`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class ConfirmLogoutComponent { }
