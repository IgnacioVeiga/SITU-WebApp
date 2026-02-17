import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import { FakeCaptchaComponent } from 'src/app/shared/components/fake-captcha/fake-captcha.component';
import { AuthPanelComponent } from 'src/app/shared/components/auth-panel/auth-panel.component';
import { LogInForm } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FakeCaptchaComponent,
        AuthPanelComponent,
        TranslateModule
    ]
})
export class LoginComponent {
  form: LogInForm = {
    email: '',
    password: ''
  };

  isSubmitting: boolean = false;

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastr = inject(ToastrService);

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(): void {
    if (this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.authService.login(this.form).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => {
        this.isSubmitting = false;
        this.toastr.error('No se pudo iniciar sesión.', 'Verificá tus credenciales');
      }
    });
  }
}
