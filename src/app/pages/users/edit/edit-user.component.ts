import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  roleTypes: string[] = ['Administrador', 'Chofer', 'Otro']
  user!: UserModel;

  constructor(@Inject(MAT_DIALOG_DATA) public data: UserModel) {
    this.user = { ...data };
  }
}
