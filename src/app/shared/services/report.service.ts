import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Complaint } from '../models/report.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private api = inject(GenericAPIService);

  GetReports(pageIndex: number, pageSize: number): Observable<Page<Complaint>> {
    return this.api.GET<any>(`complaints/${pageIndex}/${pageSize}`);
  }

  GetReport(reportId: number): Observable<Complaint> {
    return this.api.GET<Complaint>(`complaints/${reportId}`);
  }
}
