import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/models';

@Component({
  selector: 'app-edit-my-user',
  templateUrl: './edit-my-user.component.html',
  styleUrls: ['./edit-my-user.component.scss']
})
export class EditMyUserComponent {
  user: UserModel = new UserModel();

  constructor() {
    this.user.firstname = 'Natalia';
    this.user.lastname = 'Natalia';
    this.user.dni = 12345678;
    this.user.photo = undefined;
  }

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    // TODO: enviar todo al backend y guardar cambios
  }
}
