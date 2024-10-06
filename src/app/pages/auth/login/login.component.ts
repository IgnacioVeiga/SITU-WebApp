import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LogInForm } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CaptchaComponent } from "../captcha/captcha.component";
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    CaptchaComponent,
    TranslateModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  loginForm: LogInForm = {
    email: '',
    password: '',
    rememberMe: false
  }
  isLoading = false;

  private router = inject(Router);
  private authService = inject(AuthService);

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.loginForm).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard'])
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
