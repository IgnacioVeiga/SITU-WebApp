import { Component } from '@angular/core';
import { Alert } from 'src/app/shared/models/alert.model';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
    templateUrl: './create-alert.component.html',
    styleUrls: ['./create-alert.component.scss'],
    standalone: true,
    imports: [FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgFor, MatOptionModule, MatButtonModule]
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
