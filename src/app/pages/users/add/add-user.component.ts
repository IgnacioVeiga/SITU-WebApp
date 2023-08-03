import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  user: UserModel = new UserModel();
  roleTypes: string[] = ['Administrador', 'Chofer', 'Otro']

  constructor(
    private userService: UserService
  ) { }

  onSubmit() {
    this.userService.CreateUser(this.user).subscribe(
      (data: any): void => {
        console.log(data);
        // TODO: verificar si el usuario fue creado con exito
      }
    );
  }
}
