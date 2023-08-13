import { NgModule } from "@angular/core";

import { ReportDetailsComponent } from "src/app/pages/reports/details/report-details.component";
import { ReportListComponent } from "src/app/pages/reports/list/report-list.component";
import { SeeReportComponent } from "./see-report/see-report.component";

import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
    declarations: [
        ReportListComponent,
        ReportDetailsComponent,
        SeeReportComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ReportModule { }