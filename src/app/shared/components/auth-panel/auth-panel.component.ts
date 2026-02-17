import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-auth-panel',
    templateUrl: './auth-panel.component.html',
    styleUrl: './auth-panel.component.scss',
    imports: [TranslateModule]
})
export class AuthPanelComponent {
  @Input({ required: true }) titleKey: string = '';
  @Input() subtitleKey: string | null = null;
  @Input() subtitleText: string | null = null;
}
