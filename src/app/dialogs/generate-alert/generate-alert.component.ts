import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-alert',
  templateUrl: './generate-alert.component.html',
  styleUrls: ['./generate-alert.component.scss']
})
export class GenerateAlertComponent {
  locationTypes: string[] = ['Indefinida', 'Aproximada', 'Especifica'];
  selectedlocation = this.locationTypes[0];

  priorityTypes: string[] = ['Alta', 'Media', 'Baja'];
  selectedPriority = this.priorityTypes[0];
}
