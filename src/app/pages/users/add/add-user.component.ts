import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  user: UserModel = new UserModel();
  roleTypes: string[] = ['Administrador', 'Chofer', 'Otro']

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
