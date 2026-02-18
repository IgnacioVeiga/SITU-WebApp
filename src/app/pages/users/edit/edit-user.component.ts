import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploaderComponent } from 'src/app/shared/components/file-uploader/file-uploader.component';
import { User, UserRole } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Component({
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.scss'],
    imports: [
        MatDialogModule,
        FileUploaderComponent,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        FormsModule,
        TranslateModule
    ]
})
export class EditUserComponent {
  readonly profileImageBaseUrl = `${environment.API_URL}${environment.API_PREFIX}/images/user-profile/`;
  readonly maxDni = 99999999;

  roleTypes: { label: string; value: UserRole }[] = [
    { label: 'Administrador', value: UserRole.ADMIN },
    { label: 'Supervisor', value: UserRole.SUPERVISOR },
    { label: 'Empleado', value: UserRole.EMPLOYEE },
    { label: 'Chofer', value: UserRole.DRIVER },
    { label: 'Pasajero', value: UserRole.PASSENGER },
    { label: 'Regular', value: UserRole.REGULAR }
  ];

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) {}

  getProfileImageUrl(): string {
    if (!this.user.profileImage?.filename) {
      return 'assets/images/user.png';
    }

    if (this.user.profileImage.filename.startsWith('data:image')) {
      return this.user.profileImage.filename;
    }

    return `${this.profileImageBaseUrl}${this.user.profileImage.filename}`;
  }
}
