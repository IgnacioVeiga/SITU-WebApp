import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FakeCaptchaComponent } from 'src/app/shared/components/fake-captcha/fake-captcha.component';
import { AuthPanelComponent } from 'src/app/shared/components/auth-panel/auth-panel.component';
import { SignUpForm } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AfterSignUpComponent } from './after.signup.component';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    imports: [
        FormsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FakeCaptchaComponent,
        AuthPanelComponent,
        TranslateModule
    ]
})
export class SignupComponent {
  form: SignUpForm = {
    companyName: '',
    dni: undefined,
    email: '',
    firstName: '',
    lastName: '',
    notes: undefined,
    phone: ''
  };

  isSubmitting: boolean = false;

  private readonly toastr = inject(ToastrService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.authService.signup(this.form).subscribe({
      next: () => {
        this.dialog.open(AfterSignUpComponent, {
          data: this.form.email,
          autoFocus: false,
          width: 'min(520px, 92vw)',
          maxWidth: '92vw',
          panelClass: 'app-dialog-panel'
        })
          .afterClosed().subscribe(() => {
            this.goTo('auth/login');
          });
      },
      error: () => {
        this.isSubmitting = false;
        this.toastr.error('No se pudo enviar el formulario.', 'Intentelo más tarde');
      }
    });
  }
}
