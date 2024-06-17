import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Alert } from 'src/app/shared/models/alert.model';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
    templateUrl: './alert-details.component.html',
    styleUrls: ['./alert-details.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule, DatePipe]
})
export class AlertDetailsComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Alert) { }
}
