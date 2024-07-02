import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-not-found',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="not-found">
      <h1><b>404 - Page Not Found</b></h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  `,
    styles: [`
    .not-found {
      text-align: center;
      margin-top: 5rem;
    }
  `]
})
export class NotFoundComponent { }
