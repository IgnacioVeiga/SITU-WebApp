import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Complaint, ComplaintState } from "src/app/shared/models/report.model";
import { ReportService } from "src/app/shared/services/report.service";
import { DatePipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    templateUrl: './report-item.component.html',
    styleUrls: ['./report-item.component.scss'],
    imports: [
        TranslateModule,
        DatePipe
    ]
})
export class ReportItemComponent implements OnInit {
    data: Complaint = new Complaint();

    private route = inject(ActivatedRoute);
    private reportService = inject(ReportService);
    private toastr = inject(ToastrService);

    ngOnInit(): void {
        this.LoadReport();
    }

    LoadReport() {
        const REPORT_ID = Number(this.route.snapshot.paramMap.get('id'));
        this.reportService.GetReport(REPORT_ID).subscribe({
            next: (resp: Complaint) => {
                this.data = resp;
            },
            error: () => {
                // TODO: review, organize and translate all these types of toastr messages.
                this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
            }
        });
    }

    getStateLabel(state: ComplaintState): string {
        switch (state) {
            case ComplaintState.PENDING_REVIEW:
                return 'Pendiente de revisión';
            case ComplaintState.IN_REVIEW:
                return 'En revisión';
            case ComplaintState.CLOSED:
                return 'Cerrada';
            case ComplaintState.REOPENED:
                return 'Reabierta';
            default:
                return state;
        }
    }
}
