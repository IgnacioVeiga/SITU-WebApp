import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Report } from "src/app/shared/models/report.model";
import { ReportService } from "src/app/shared/services/report.service";
import { DatePipe } from "@angular/common";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";

@Component({
    templateUrl: './see-report.component.html',
    styleUrls: ['./see-report.component.scss'],
    standalone: true,
    imports: [NavbarComponent, DatePipe]
})
export class SeeReportComponent implements OnInit {
    data: Report = new Report();

    constructor(
        private route: ActivatedRoute,
        private reportService: ReportService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.LoadReport();
    }

    LoadReport() {
        const REPORT_ID = Number(this.route.snapshot.paramMap.get('id'));
        this.reportService.GetReport(REPORT_ID).subscribe({
            next: (resp: Report) => {
                this.data = resp;
            },
            error: () => {
                this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
            }
        });
    }
}