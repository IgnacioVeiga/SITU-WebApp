import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <img src="../../../assets/svg/wave.svg" alt="wave">
    <div class="not-found">
      <h1><b>{{'PAGE_NOT_FOUND_TITLE' | translate}}</b></h1>
      <p>{{'PAGE_NOT_FOUND_TEXT' | translate}}</p>
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
