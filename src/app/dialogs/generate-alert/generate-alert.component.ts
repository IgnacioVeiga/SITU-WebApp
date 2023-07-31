import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertModel } from 'src/app/models/models';

@Component({
  selector: 'app-generate-alert',
  templateUrl: './generate-alert.component.html',
  styleUrls: ['./generate-alert.component.scss']
})
export class GenerateAlertComponent {
  alert: AlertModel = new AlertModel();
  priorityTypes: string[] = ['Alta', 'Media', 'Baja'];

  onSubmit(myForm: NgForm) {
    console.log(myForm.value);
    // TODO: enviar todo al backend y guardar cambios
  }
}
