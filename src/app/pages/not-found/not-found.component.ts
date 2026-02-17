import { Component } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-not-found',
    imports: [TranslateModule],
    template: `
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
