import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertModel } from 'src/app/models/alert.model';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.scss']
})
export class AlertDetailsComponent {
  generatedBy: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertModel) {
    // TODO: obtener el nombre de la persona desde Backend
    this.generatedBy = 'Pepe Argento';
  }
}
