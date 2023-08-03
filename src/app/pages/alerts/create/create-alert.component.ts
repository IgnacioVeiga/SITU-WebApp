import { Component } from '@angular/core';
import { AlertModel } from 'src/app/models/alert.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-create-alert',
  templateUrl: './create-alert.component.html',
  styleUrls: ['./create-alert.component.scss']
})
export class CreateAlertComponent {
  alert: AlertModel = new AlertModel();
  priorityTypes: string[] = ['Alta', 'Media', 'Baja'];

  constructor(
    private alertService: AlertService
  ) { }

  onSubmit() {
    this.alertService.CreateAlert(this.alert).subscribe(
      (data: any): void => {
        console.log(data);
        // TODO: verificar si la alerta fue creada con exito
      }
    );
  }
}
