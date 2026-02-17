import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ChangePasswordDTO } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss'],
    imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule
    ]
})
export class UpdatePasswordComponent {
  form: ChangePasswordDTO = {
    currentPassword: '',
    newPassword: ''
  };

  repeatPassword: string = '';
  isSubmitting: boolean = false;

  private readonly toastr = inject(ToastrService);
  private readonly authService = inject(AuthService);

  constructor(public dialogRef: MatDialogRef<UpdatePasswordComponent>) {}

  get passwordsMatch(): boolean {
    return this.form.newPassword.length > 0 && this.form.newPassword === this.repeatPassword;
  }

  sendForm(): void {
    if (this.isSubmitting || !this.passwordsMatch) {
      return;
    }

    this.isSubmitting = true;

    this.authService.updatePassword(this.form).subscribe({
      next: () => {
        this.dialogRef.close();
        this.toastr.success('Contraseña actualizada correctamente.');
      },
      error: () => {
        this.isSubmitting = false;
        this.toastr.error('No se pudo actualizar la contraseña.', 'Inténtelo nuevamente');
      }
    });
  }
}
