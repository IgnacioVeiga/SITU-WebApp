import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChangePasswordDTO } from 'src/app/shared/models/auth.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FileUploaderComponent,
    TranslateModule
  ]
})
export class UpdatePasswordComponent {
  form: ChangePasswordDTO = {
    currentPassword: '',
    newPassword: ''
  };

  private toastr = inject(ToastrService);
  private authService = inject(AuthService);

  constructor(
    public dialogRef: MatDialogRef<UpdatePasswordComponent>
  ) { }

  sendForm() {
    this.authService.updatePassword(this.form).subscribe({
      next: (response: any) => {
        // TODO: refactor
        this.dialogRef.close();
        this.toastr.info(response.message);
      }
    });
  }
}
