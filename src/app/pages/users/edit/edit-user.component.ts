import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';

import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FileUploaderComponent } from '../../../shared/components/file-uploader/file-uploader.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: true,
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
  roleTypes = [
    {
      text: 'Administrador',
      value: 'ADMIN'
    },
    {
      text: 'Chofer',
      value: 'DRIVER'
    },
    {
      text: 'Otro',
      value: 'OTHER'
    }
  ]

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User
  ) { }
}
