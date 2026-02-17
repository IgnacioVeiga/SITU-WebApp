import { inject, Injectable } from '@angular/core';
import { Complaint } from '../models/complaint.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';
import { ComplaintService } from './complaint.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private complaints = inject(ComplaintService);

  GetReports(pageIndex: number, pageSize: number): Observable<Page<Complaint>> {
    return this.complaints.getComplaints(pageIndex, pageSize);
  }

  GetReport(reportId: number): Observable<Complaint> {
    return this.complaints.getComplaint(reportId);
  }

  GetMyReports(pageIndex: number, pageSize: number): Observable<Page<Complaint>> {
    return this.complaints.getMyComplaints(pageIndex, pageSize);
  }
}
