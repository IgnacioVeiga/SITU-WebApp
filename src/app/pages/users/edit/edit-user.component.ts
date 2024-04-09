import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user.model';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
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
