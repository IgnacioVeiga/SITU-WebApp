import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideToastr } from "ngx-toastr";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimations(),
        provideToastr({
            timeOut: 3000,
            closeButton: true,
            preventDuplicates: true,
            progressBar: true
        })
    ]
}