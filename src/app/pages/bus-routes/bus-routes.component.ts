import { Component } from '@angular/core';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss']
})
export class BusRoutesComponent {
  linea: number = 0;
  lineas: number[] = [];
  trasbordos: string[] = ['Opción 1', 'Opción 2', 'Opción 3'];

  addLinea() {
    if (this.linea > 0) {
      this.lineas.push(this.linea);
      this.linea = 0;
    }
  }
}
