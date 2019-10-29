import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html'
})
export class RegistrarseComponent implements OnInit {

  constructor(
    private router: Router,
    public appService: AppService
  ) {
    this.appService.mostrarToolbar = false;
  }

  ngOnInit() {
  }

  goTo(route: string) {
    // recibe el path como string (ver app-routing.module)
    this.router.navigate([route]);
    if (route === 'ingresar') {
      this.appService.mostrarToolbar = true;
      this.router.navigate([route]);
    } else {
      this.appService.mostrarToolbar = false;
      this.router.navigate([route]);
    }
  }
}
