import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericAPIService } from './generic-api.service';
import { Complaint } from '../models/complaint.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {
  private api = inject(GenericAPIService);

  getComplaints(pageIndex: number, pageSize: number): Observable<Page<Complaint>> {
    return this.api.GET<Page<Complaint>>(`complaints/${pageIndex}/${pageSize}`);
  }

  getMyComplaints(pageIndex: number, pageSize: number): Observable<Page<Complaint>> {
    return this.api.GET<Page<Complaint>>(`complaints/mine/${pageIndex}/${pageSize}`);
  }

  getComplaint(complaintId: number): Observable<Complaint> {
    return this.api.GET<Complaint>(`complaints/${complaintId}`);
  }

  getComplaintByTrackingToken(trackingToken: string): Observable<Complaint> {
    return this.api.GET<Complaint>(`complaints/tracking/${trackingToken}`);
  }
}
