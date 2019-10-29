import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html'
})
export class RegistrarseComponent implements OnInit {

  constructor(
    private router: Router,
    public appService: AppService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.appService.mostrarToolbar = false;
  }

  goTo(route: string) {
    // recibe el path como string (ver app-routing.module)
    if (route === 'ingresar') {
      this.appService.mostrarToolbar = false;
    } else {
      this.appService.mostrarToolbar = true;
    }
    this.changeDetectorRef.detectChanges();
    this.router.navigate([route]);
  }
}
