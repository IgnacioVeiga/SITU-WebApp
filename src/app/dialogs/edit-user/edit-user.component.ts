import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  apellido: string = '';
  nombre: string = '';
  dni: string = '';
  selectedRole: string = '';
  roleTypes: string[] = ['Administrador', 'Control', 'Chofer']

  constructor() {
    this.apellido = 'Natalia';
    this.nombre = 'Natalia';
    this.dni = '12 345 678'
    this.selectedRole = 'Chofer';
  }
}
