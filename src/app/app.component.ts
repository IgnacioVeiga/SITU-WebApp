import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, MatProgressSpinnerModule, TranslateModule]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  get currentLanguage() {
    return this.translate.currentLang;
  }

  private router = inject(Router);
  private translate = inject(TranslateService);

  ngOnInit() {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');

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

  toggleLanguage() {
    switch (this.currentLanguage) {
      case 'es':
        this.translate.use('en')
        break;

      default:
        this.translate.use('es');
        break;
    }
  }
}
