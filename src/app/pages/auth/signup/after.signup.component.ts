import { Component, Inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `
    <h1 mat-dialog-title>{{'AFTER_SIGNUP_TITLE' | translate}}</h1>
    <mat-dialog-content>
      <p [innerHTML]="'AFTER_SIGNUP_TEXT' | translate: {email: email}"></p>
    </mat-dialog-content>
    <mat-dialog-actions align="center">
      <button mat-raised-button color="primary" mat-dialog-close>{{'CLOSE' | translate}}</button>
    </mat-dialog-actions>
`,
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    TranslateModule
  ]
})
export class AfterSignUpComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public email: string) { }
}
