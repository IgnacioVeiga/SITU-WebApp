import { Component } from '@angular/core';
import { AlertModel } from 'src/app/shared/models/alert.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.scss']
})
export class CreateAlertComponent {
  alert: AlertModel = new AlertModel();
  priorityTypes: string[] = ['Alta', 'Media', 'Baja'];

  constructor(
    private alertService: AlertService
  ) {
    const MY_ID = 1;
    this.alert.userId = MY_ID;
  }

  onSubmit() {
    this.alertService.CreateAlert(this.alert).subscribe(
      (data: any): void => {
        console.log(data);
        // TODO: verificar si la alerta fue creada con exito
      }
    );
  }
}
