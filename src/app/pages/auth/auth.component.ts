import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    TranslateModule,
    RouterOutlet
  ]
})
export class AuthComponent {
  private router = inject(Router);

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
