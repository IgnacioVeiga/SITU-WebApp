import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { BusLineModel, CheckListItem } from 'src/app/models/models';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss']
})
export class BusRoutesComponent {
  busList: BusLineModel[] = [];

  addLinea(event: MatChipInputEvent): void {
    const value = parseInt((event.value || '').trim());
    if (value) {
      let line: BusLineModel = new BusLineModel;
      line.LineNumber = value;
      line.Routes = this.generarElementosAleatorios(6);
      this.busList.push(line);
    }
    event.chipInput!.clear();
  }

  removeLinea(linea: number) {
    const index = this.busList.findIndex(b => b.LineNumber === linea);
    this.busList.splice(index, 1);
  }

  generarElementosAleatorios(cantidad: number): CheckListItem[] {
    const elementosAleatorios: CheckListItem[] = [];
    for (let i = 1; i <= cantidad; i++) {
      const item: CheckListItem = new CheckListItem();
      item.id = i;
      item.text = `Trayecto ${i}`;
      item.checked = Math.random() < 0.5; // Genera aleatoriamente true o false
      elementosAleatorios.push(item);
    }
    return elementosAleatorios;
  }
}
