import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ReportModel } from "src/app/shared/models/report.model";
import { ReportService } from "src/app/shared/services/report.service";
import { UserService } from "src/app/shared/services/user.service";

@Component({
    templateUrl: './see-report.component.html',
    styleUrls: ['./see-report.component.scss']
})
export class SeeReportComponent implements OnInit {
    data: ReportModel = new ReportModel();
    claimantFullname: string = '';

    constructor(
        private route: ActivatedRoute,
        private reportService: ReportService,
        private userService: UserService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.LoadReport();
    }

    LoadReport() {
        const REPORT_ID = Number(this.route.snapshot.paramMap.get('id'));
        this.reportService.GetReport(REPORT_ID).subscribe({
            next: (resp) => {
                if (resp) {
                    this.data = resp;
                    this.GetClaimantFullname();
                }
            },
            error: () => {
                this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
            }
        });
    }

    GetClaimantFullname() {
        this.userService.GetUserFullname(this.data.userId).subscribe({
            next: (resp: any) => {
                if (resp) {
                    this.claimantFullname = `${resp[0].lastname} ${resp[0].firstname}`;
                }
            },
            error: () => {
                this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
            }
        });
    }
}