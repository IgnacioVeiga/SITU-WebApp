import { Component } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: 'fake-captcha',
    templateUrl: './fake-captcha.component.html',
    styleUrls: ['./fake-captcha.component.scss'],
    standalone: true,
    imports: [TranslateModule]
})
export class FakeCaptchaComponent {
    
}