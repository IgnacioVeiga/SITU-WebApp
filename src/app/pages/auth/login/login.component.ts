import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LogInForm } from 'src/app/shared/models/auth.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule
  ]
})
export class LoginComponent {
  loginForm: LogInForm = {
    email: '',
    password: '',
    rememberMe: false
  }

  private toastr = inject(ToastrService);
  private router = inject(Router);
  private authService = inject(AuthService);

  goTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit() {
    this.authService.login(this.loginForm).subscribe({
      next: () => {
        this.goTo('dashboard');
      },
      error: (err) => {
        this.toastr.error(err);
      }
    });
  }
}
