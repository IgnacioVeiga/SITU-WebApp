import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-my-user',
  templateUrl: './edit-my-user.component.html',
  styleUrls: ['./edit-my-user.component.scss']
})
export class EditMyUserComponent {
  user: UserModel = new UserModel();
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
  ) {
    // TODO: traer el id del usuario logeado
    const USER_ID = 1;
    this.userService.GetUserFullname(USER_ID).subscribe({
      next: (resp: any) => {
        this.user = resp[0];
        // TODO: si es posible autocompletar el email
      },
      error: () => {
        this.toastr.error("No se pudo conectar al servidor", 'Intentelo más tarde');
      }
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    // Previsualización de la imagen antes de subirla al servidor
    const reader = new FileReader();
    reader.onload = (e) => {
      this.user.photoURL = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  sendForm() {
    // TODO: Verificar por backend si la contraseña actual es correcta
    if (this.newPassword) {
      this.loginData.password = this.newPassword;
    }
    this.dialogRef.close(true);
  }
}
