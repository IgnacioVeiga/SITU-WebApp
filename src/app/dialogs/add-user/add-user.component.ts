import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  selectedRole: string = '';
  roleTypes: string[] = ['Administrador', 'Control', 'Chofer']
}
