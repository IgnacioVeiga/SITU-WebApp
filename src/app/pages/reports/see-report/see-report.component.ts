import { Component, OnInit } from "@angular/core";
import { ReportModel } from "src/app/shared/models/report.model";

@Component({
    templateUrl: './see-report.component.html',
    styleUrls: ['./see-report.component.scss']
})
export class SeeReportComponent implements OnInit {
    data: ReportModel = new ReportModel();

    constructor() { }
    
    ngOnInit(): void {
        
    }
}