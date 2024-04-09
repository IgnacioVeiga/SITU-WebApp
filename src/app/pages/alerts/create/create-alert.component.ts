import { Component } from '@angular/core';
import { Alert } from 'src/app/shared/models/alert.model';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.scss']
})
export class CreateAlertComponent {
  alert: Alert = new Alert();
  priorityTypes: string[] = ['ALTA', 'MEDIA', 'BAJA'];

  constructor(
    private alertService: AlertService
  ) {}

  onSubmit() {
    this.alertService.CreateAlert(this.alert).subscribe(
      (data: any): void => {
        console.log(data);
        // TODO: verificar si la alerta fue creada con exito
      }
    );
  }
}
