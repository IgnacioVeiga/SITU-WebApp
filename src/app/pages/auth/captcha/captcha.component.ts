import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: 'captcha',
    templateUrl: './captcha.component.html',
    styleUrls: ['./captcha.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class CaptchaComponent {
    
}