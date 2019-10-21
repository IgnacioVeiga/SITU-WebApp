import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html'
})
export class RegistrarseComponent implements OnInit {

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
