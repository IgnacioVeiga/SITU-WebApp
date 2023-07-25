import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html'
})
export class IngresarComponent {

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
