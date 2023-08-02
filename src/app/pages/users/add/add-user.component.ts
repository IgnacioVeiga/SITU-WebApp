import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'src/app/models/models';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  user: UserModel = new UserModel();
  roleTypes: string[] = ['Administrador', 'Chofer', 'Otro']

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    // TODO: enviar todo al backend y guardar cambios
  }
}
