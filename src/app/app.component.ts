import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, MatProgressSpinnerModule, TranslateModule]
})
export class AppComponent implements OnInit {
  isLoading: boolean = true;

  private readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  get currentLanguage(): string {
    return this.translate.currentLang || this.translate.getDefaultLang() || 'es';
  }

  get nextLanguageLabel(): string {
    return this.currentLanguage === 'es' ? 'EN' : 'ES';
  }

  ngOnInit(): void {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('es');
    this.translate.use('es');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        return;
      }

      if (event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel) {
        this.isLoading = false;
      }
    });
  }

  toggleLanguage(): void {
    this.translate.use(this.currentLanguage === 'es' ? 'en' : 'es');
  }
}
