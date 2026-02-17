import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    imports: [
        TranslateModule,
        RouterOutlet
    ]
})
export class AuthComponent {}
