import { Component, OnInit, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Complaint, ComplaintState } from "src/app/shared/models/complaint.model";
import { ComplaintService } from "src/app/shared/services/complaint.service";
import { DatePipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    templateUrl: './complaint-item.component.html',
    styleUrls: ['./complaint-item.component.scss'],
    imports: [
        TranslateModule,
        DatePipe
    ]
})
export class ComplaintItemComponent implements OnInit {
    data: Complaint = new Complaint();

    private route = inject(ActivatedRoute);
    private complaintService = inject(ComplaintService);
    private toastr = inject(ToastrService);

    ngOnInit(): void {
        this.loadComplaint();
    }

    loadComplaint() {
        const complaintId = Number(this.route.snapshot.paramMap.get('id'));
        this.complaintService.getComplaint(complaintId).subscribe({
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
