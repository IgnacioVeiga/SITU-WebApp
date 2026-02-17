import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Complaint, ComplaintState } from 'src/app/shared/models/complaint.model';
import { ComplaintService } from 'src/app/shared/services/complaint.service';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  templateUrl: './complaint-tracking.component.html',
  styleUrls: ['./complaint-tracking.component.scss'],
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DatePipe,
    TranslateModule
  ]
})
export class ComplaintTrackingComponent {
  trackingToken = '';
  complaint: Complaint | null = null;

  private complaintService = inject(ComplaintService);
  private router = inject(Router);

  searchByToken(): void {
    const sanitizedToken = this.trackingToken.trim();
    if (!sanitizedToken) {
      return;
    }

    this.complaintService.getComplaintByTrackingToken(sanitizedToken).subscribe({
      next: (complaint) => {
        this.complaint = complaint;
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  getStateLabel(state: ComplaintState): string {
    switch (state) {
      case ComplaintState.PENDING_REVIEW:
        return 'Pending review';
      case ComplaintState.IN_REVIEW:
        return 'In review';
      case ComplaintState.CLOSED:
        return 'Closed';
      case ComplaintState.REOPENED:
        return 'Reopened';
      default:
        return state;
    }
  }
}
