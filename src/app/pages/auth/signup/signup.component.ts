import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AfterSignUpComponent } from './after.signup.component';
import { SignUpForm } from 'src/app/shared/models/auth.model';


@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule
  ]
})
export class SignupComponent {
  form: SignUpForm = {
    companyName: '',
    dni: undefined,
    email: '',
    firstName: '',
    lastName: '',
    note: undefined,
    phone: ''
  }

  private toastr = inject(ToastrService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private authService = inject(AuthService);

  goTo(route: string) {
    this.router.navigate([route]);
  }

  onSubmit() {
    this.authService.signup(this.form).subscribe({
      next: (resp: string) => {
        console.info(resp)
        this.toastr.success('Formulario de inscripción enviado con exito.', 'Revisa tu email.');
        this.dialog.open(AfterSignUpComponent).afterClosed()
          .subscribe(() => {
            this.goTo('/home');
          });
      },
      error: () => {
        this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
      }
    });
  }
}