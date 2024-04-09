import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alert } from 'src/app/shared/models/alert.model';

@Component({
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.scss']
})
export class AlertDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Alert) { }
}
