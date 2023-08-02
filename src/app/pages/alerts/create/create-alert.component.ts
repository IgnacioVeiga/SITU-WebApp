import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertModel } from 'src/app/models/models';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.scss']
})
export class CreateAlertComponent {
  alert: AlertModel = new AlertModel();
  priorityTypes: string[] = ['Alta', 'Media', 'Baja'];

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    // TODO: enviar todo al backend y guardar cambios
  }
}
