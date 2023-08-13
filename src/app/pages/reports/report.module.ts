import { NgModule } from "@angular/core";

import { ReportListComponent } from "src/app/pages/reports/list/report-list.component";
import { SeeReportComponent } from "./see-report/see-report.component";

import { SharedModule } from "../../shared/modules/shared.module";

@NgModule({
    declarations: [
        ReportListComponent,
        SeeReportComponent
    ],
    imports: [
        SharedModule
    ]
})
export class ReportModule { }