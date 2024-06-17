import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, MatProgressSpinnerModule]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
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
