import { NgModule } from "@angular/core";

import { CreateAlertComponent } from "src/app/pages/alerts/create/create-alert.component";
import { AlertDetailsComponent } from "src/app/pages/alerts/details/alert-details.component";
import { AlertListComponent } from "src/app/pages/alerts/list/alert-list.component";

import { SharedModule } from "./shared.module";

@NgModule({
    declarations: [
        AlertListComponent,
        CreateAlertComponent,
        AlertDetailsComponent,
    ],
    imports: [
        SharedModule
    ]
})
export class AlertModule { }