import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html'
})
export class IngresarComponent implements OnInit {

  constructor(
    private router: Router,
    public appService: AppService
  ) { }

  ngOnInit() {
    this.appService.mostrarToolbar = false;
  }

  goTo(route: string) {
    // recibe el path como string (ver app-routing.module)
    if (route === 'inicio') {
      this.appService.mostrarToolbar = true;
      this.router.navigate([route]);
    } else {
      this.appService.mostrarToolbar = false;
      this.router.navigate([route]);
    }
  }
}
