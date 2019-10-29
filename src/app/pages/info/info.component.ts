import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html'
})
export class InfoComponent implements OnInit {
  acercaDeNosotros = false;
  lineas = false;

  constructor() { }

  ngOnInit() {
  }

  changeAcercaDeNosotros() {
    this.acercaDeNosotros = true;
    this.lineas = false;
  }

  changeLineas() {
    this.acercaDeNosotros = false;
    this.lineas = true;
  }


}
