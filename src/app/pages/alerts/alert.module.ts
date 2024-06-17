import { NgModule } from "@angular/core";

import { CreateAlertComponent } from "src/app/pages/alerts/create/create-alert.component";
import { AlertDetailsComponent } from "src/app/pages/alerts/details/alert-details.component";
import { AlertListComponent } from "src/app/pages/alerts/list/alert-list.component";

import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
    imports: [
        SharedModule,
        AlertListComponent,
        CreateAlertComponent,
        AlertDetailsComponent
    ]
})
export class AlertModule { }