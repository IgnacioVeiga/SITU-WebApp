import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Report } from '../models/report.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private api = inject(GenericAPIService);

  GetReports(pageIndex: number, pageSize: number): Observable<Page<Report>> {
    return this.api.GET<any>(`reports/${pageIndex}/${pageSize}`);
  }

  GetReport(reportId: number): Observable<Report> {
    return this.api.GET<Report>(`reports/${reportId}`);
  }
}
