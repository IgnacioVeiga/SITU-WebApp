import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent {
  acercaDeNosotros = false;
  lineas = false;

  constructor() { }

  changeAcercaDeNosotros() {
    this.acercaDeNosotros = true;
    this.lineas = false;
  }

  changeLineas() {
    this.acercaDeNosotros = false;
    this.lineas = true;
  }

}
