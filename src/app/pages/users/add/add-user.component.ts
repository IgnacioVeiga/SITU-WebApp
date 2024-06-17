import { Component } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss'],
    standalone: true,
    imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule]
})
export class AddUserComponent {
  user: User = new User();
  roleTypes: string[] = ['Administrador', 'Chofer', 'Otro']

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    // Previsualización de la imagen antes de subirla al servidor
    const reader = new FileReader();
    reader.onload = (e) => {
      this.user.profileImage.filename = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
