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
    TranslateModule
]
})
export class LoginComponent {
  loginForm: LogInForm = {
    email: '',
    password: '',
    rememberMe: false
  }

  private router = inject(Router);
  private authService = inject(AuthService);

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit() {
    this.authService.login(this.loginForm);
  }
}
