import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Report } from "src/app/shared/models/report.model";
import { ReportService } from "src/app/shared/services/report.service";
import { DatePipe } from "@angular/common";
import { NavbarComponent } from "../../../shared/components/navbar/navbar.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    templateUrl: './report-item.component.html',
    styleUrls: ['./report-item.component.scss'],
    standalone: true,
    imports: [
        NavbarComponent,
        TranslateModule,
        DatePipe
    ]
})
export class ReportItemComponent implements OnInit {
    data: Report = new Report();

    private route = inject(ActivatedRoute);
    private reportService = inject(ReportService);
    private toastr = inject(ToastrService);

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
                // TODO: review, organize and translate all these types of toastr messages.
                this.toastr.error('No se pudo conectar al servidor', 'Intentelo más tarde');
            }
        });
    }
}