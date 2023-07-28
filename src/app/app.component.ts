import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {

        // Esto simula tiempo de carga, eliminar cuando tengamos el backend
        setTimeout(() => {
          this.isLoading = false;
        }, 300);

        // Esto es para cuando tengamos el Backend
        // this.isLoading = false;
      }
    });
  }
}
