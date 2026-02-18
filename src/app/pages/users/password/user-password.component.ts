import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { ChangePasswordDTO } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss'],
  imports: [
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
    PageHeaderComponent
  ]
})
export class UserPasswordComponent {
  form: ChangePasswordDTO = {
    currentPassword: '',
    newPassword: ''
  };

  repeatPassword: string = '';
  isSubmitting: boolean = false;

  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly authService = inject(AuthService);

  get passwordsMatch(): boolean {
    return this.form.newPassword.length > 0 && this.form.newPassword === this.repeatPassword;
  }

  get canSubmit(): boolean {
    return !this.isSubmitting
      && this.form.currentPassword.trim().length > 0
      && this.form.newPassword.trim().length >= 8
      && this.passwordsMatch;
  }

  submit(): void {
    if (!this.canSubmit) {
      return;
    }

    this.isSubmitting = true;

    this.authService.updatePassword(this.form).subscribe({
      next: () => {
        this.toastr.success('Contraseña actualizada correctamente.');
        this.router.navigate(['/user/list']);
      },
      error: () => {
        this.isSubmitting = false;
        this.toastr.error('No se pudo actualizar la contraseña.', 'Inténtelo nuevamente');
      }
    });
  }
}
