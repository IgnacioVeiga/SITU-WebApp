import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserModel } from 'src/app/shared/models/user.model';

@Component({
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  roleTypes: string[] = ['Administrador', 'Chofer', 'Otro']

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserModel
  ) { }


  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    // Previsualización de la imagen antes de subirla al servidor
    const reader = new FileReader();
    reader.onload = (e) => {
      this.user.photoURL = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
