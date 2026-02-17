import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthPanelComponent } from 'src/app/shared/components/auth-panel/auth-panel.component';
import { Complaint, ComplaintPriority, ComplaintState } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';

@Component({
  templateUrl: './complaint-tracking.component.html',
  styleUrls: ['./complaint-tracking.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    TranslateModule,
    NgClass,
    AuthPanelComponent
  ]
})
export class ComplaintTrackingComponent {
  trackingToken: string = '';
  complaint: Complaint | null = null;
  isSearching: boolean = false;
  hasSearched: boolean = false;

  private readonly complaintService = inject(ComplaintService);
  private readonly router = inject(Router);

  searchByToken(): void {
    const sanitizedToken = this.trackingToken.trim();
    if (!sanitizedToken || this.isSearching) {
      return;
    }

    this.hasSearched = true;
    this.isSearching = true;

    this.complaintService.getComplaintByTrackingToken(sanitizedToken).subscribe({
      next: (complaint) => {
        this.complaint = complaint;
        this.isSearching = false;
      },
      error: () => {
        this.complaint = null;
        this.isSearching = false;
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
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
}
