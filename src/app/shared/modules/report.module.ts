import { NgModule } from "@angular/core";

import { ReportDetailsComponent } from "src/app/pages/reports/details/report-details.component";
import { ReportListComponent } from "src/app/pages/reports/list/report-list.component";

import { SharedModule } from "./shared.module";

@NgModule({
    declarations: [
        ReportListComponent,
        ReportDetailsComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ReportModule { }