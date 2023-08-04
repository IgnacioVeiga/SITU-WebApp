import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportModel } from 'src/app/models/report.model';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss']
})
export class ReportDetailsComponent {
  generatedBy: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: ReportModel) {
    // TODO: obtener el nombre de la persona desde Backend
    this.generatedBy = 'Pepe Argento';
  }
}
