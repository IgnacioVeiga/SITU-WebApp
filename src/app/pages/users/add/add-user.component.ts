import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { User, UserRole } from 'src/app/shared/models/user.model';

@Component({
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    imports: [
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        TranslateModule
    ]
})
export class AddUserComponent {
  readonly fallbackProfileImage = 'assets/images/user.png';
  user: User = {
    ...new User(),
    role: UserRole.EMPLOYEE
  };

  roleTypes: { label: string; value: UserRole }[] = [
    { label: 'Administrador', value: UserRole.ADMIN },
    { label: 'Supervisor', value: UserRole.SUPERVISOR },
    { label: 'Empleado', value: UserRole.EMPLOYEE },
    { label: 'Chofer', value: UserRole.DRIVER },
    { label: 'Pasajero', value: UserRole.PASSENGER }
  ];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    // Preview only. Upload is handled later by the backend endpoint.
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      this.user.profileImage.filename = String(loadEvent.target?.result || '');
    };
    reader.readAsDataURL(file);
  }

  getProfilePreview(): string {
    return this.user.profileImage.filename || this.fallbackProfileImage;
  }
}
