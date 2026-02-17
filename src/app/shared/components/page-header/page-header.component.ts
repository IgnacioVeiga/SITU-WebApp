import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.component.html',
    styleUrl: './page-header.component.scss',
    imports: [TranslateModule]
})
export class PageHeaderComponent {
  @Input({ required: true }) titleKey: string = '';
  @Input() subtitle: string = '';
}
