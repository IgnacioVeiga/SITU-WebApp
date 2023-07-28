import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  dni: string = '12 345 678';
  selectedRole: string = '';
  roleTypes: string[] = ['Administrador', 'Control', 'Chofer']
}
