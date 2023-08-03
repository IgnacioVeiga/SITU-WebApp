import { Component } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-my-user',
  templateUrl: './edit-my-user.component.html',
  styleUrls: ['./edit-my-user.component.scss']
})
export class EditMyUserComponent {
  user: UserModel = new UserModel();

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
