import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    TranslateModule
  ]
})
export class HomeComponent {
  private router = inject(Router);

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
