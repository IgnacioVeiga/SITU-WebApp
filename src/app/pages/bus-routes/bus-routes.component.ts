import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss']
})
export class BusRoutesComponent {
  lineas: number[] = [];
  trasbordos: string[] = [];

  addLinea(event: MatChipInputEvent): void {
    const value = parseInt((event.value || '').trim());
    if (value) {
      this.lineas.push(value);
      this.trasbordos = TRASBORDOS_DEMO;
    }
    event.chipInput!.clear();
  }

  removeLinea(linea: number) {
    const index = this.lineas.indexOf(linea);
    if (index >= 0) {
      this.lineas.splice(index, 1);
    }

    if (this.lineas.length === 0) {
      this.trasbordos = [];
    }
  }
}

const TRASBORDOS_DEMO: string[] = ['Desde A - Hasta B', 'Desde B - Hasta A', 'Desde C - Hasta D', 'Desde D - Hasta C'];