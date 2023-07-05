import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html'
})
export class RegistrarseComponent {

  constructor(private router: Router) {}

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
