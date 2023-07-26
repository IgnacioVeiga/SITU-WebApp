import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss']
})
export class BusRoutesComponent {
  linea: number = 0;
  lineas: number[] = [];
  trasbordos: string[] = ['Desde A - Hasta B', 'Desde B - Hasta A', 'Desde C - Hasta D', 'Desde D - Hasta C'];

  addLinea(event: MatChipInputEvent): void {
    const value = parseInt((event.value || '').trim());
    if (value) {
      this.lineas.push(value);
    }
    event.chipInput!.clear();
  }

  removeLinea(linea: number) {
    const index = this.lineas.indexOf(linea);
    if (index >= 0) {
      this.lineas.splice(index, 1);
    }
  }
}
