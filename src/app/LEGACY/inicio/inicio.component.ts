import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {
  /*
  esta es la pantalla de inicio,
  tanto para pasajeros y administradores
  */

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goTo(route: string) {
    // recibe el path como string
    this.router.navigate([route]);
  }
}
