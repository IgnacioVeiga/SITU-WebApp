import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    templateUrl: './edit-my-user.component.html',
    styleUrls: ['./edit-my-user.component.scss'],
    standalone: true,
    imports: [NgIf, FormsModule, MatDialogModule, FileUploaderComponent, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class EditMyUserComponent implements OnInit {
  user: User = new User();
  newPassword: string = '';
  confirmPassword: string = '';

  loginData: any = {
    email: '',
    password: ''
  }

  constructor(
    public dialogRef: MatDialogRef<EditMyUserComponent>,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // TODO: traer el id del usuario logeado
    const USER_ID = 1;
    this.userService.GetUser(USER_ID).subscribe({
      next: (resp: any) => {
        this.user = resp;
        // TODO: si es posible autocompletar el email
      },
      error: () => {
        this.toastr.error("No se pudo conectar al servidor", 'Intentelo más tarde');
      }
    });
  }

  sendForm() {
    // TODO: Verificar por backend si la contraseña actual es correcta
    if (this.newPassword) {
      this.loginData.password = this.newPassword;
    }
    this.dialogRef.close(true);
  }
}
