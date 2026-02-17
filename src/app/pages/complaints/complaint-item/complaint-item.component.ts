import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { Complaint, ComplaintPriority, ComplaintState } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';

@Component({
    templateUrl: './complaint-item.component.html',
    styleUrls: ['./complaint-item.component.scss'],
    imports: [
        TranslateModule,
        DatePipe,
        NgClass,
        PageHeaderComponent
    ]
})
export class ComplaintItemComponent implements OnInit {
    data: Complaint = new Complaint();

    private readonly route = inject(ActivatedRoute);
    private readonly complaintService = inject(ComplaintService);
    private readonly toastr = inject(ToastrService);

    ngOnInit(): void {
        this.loadComplaint();
    }

    loadComplaint(): void {
        const complaintId = Number(this.route.snapshot.paramMap.get('id'));
        this.complaintService.getComplaint(complaintId).subscribe({
            next: (resp: Complaint) => {
                this.data = resp;
            },
            error: () => {
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

    getStateClass(state: ComplaintState): string {
        switch (state) {
            case ComplaintState.PENDING_REVIEW:
                return 'state-pending';
            case ComplaintState.IN_REVIEW:
                return 'state-in-review';
            case ComplaintState.CLOSED:
                return 'state-closed';
            case ComplaintState.REOPENED:
                return 'state-reopened';
            default:
                return 'state-pending';
        }
    }

    getPriorityLabel(priority: ComplaintPriority): string {
        switch (priority) {
            case ComplaintPriority.HIGH:
                return 'Alta';
            case ComplaintPriority.MEDIUM:
                return 'Media';
            case ComplaintPriority.LOW:
                return 'Baja';
            default:
                return 'Media';
        }
    }

    getPriorityClass(priority: ComplaintPriority): string {
        switch (priority) {
            case ComplaintPriority.HIGH:
                return 'priority-high';
            case ComplaintPriority.MEDIUM:
                return 'priority-medium';
            case ComplaintPriority.LOW:
                return 'priority-low';
            default:
                return 'priority-medium';
        }
    }

    getPageSubtitle(): string {
        return `Creada el ${new Date(this.data.createdAt).toLocaleString('es-AR')}`;
    }
}
