import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-alert',
  templateUrl: './generate-alert.component.html',
  styleUrls: ['./generate-alert.component.scss']
})
export class GenerateAlertComponent {
  locationTypes: string[] = ['Especifica', 'General', 'Indefinida'];
  priorityTypes: string[] = ['Alta', 'Media', 'Baja'];
}
