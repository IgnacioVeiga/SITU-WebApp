import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    public appService: AppService
  ) { }

  ngOnInit() {
  }

  goTo(route: string) {
    // recibe el path como string
    if (route === 'registrarse') {
      this.appService.mostrarToolbar = false;
      this.router.navigate([route]);
    } else {
      this.appService.mostrarToolbar = true;
      this.router.navigate([route]);
    }
  }

}
