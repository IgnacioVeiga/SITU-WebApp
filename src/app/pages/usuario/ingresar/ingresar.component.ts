import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html'
})
export class IngresarComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goTo(route: string) {
    // recibe el path como string (ver app-routing.module)
    this.router.navigate([route]);
  }
}
