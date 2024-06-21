import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Report } from '../models/report.model';
import { Observable } from 'rxjs';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly TABLE_NAME = 'reports';

  constructor(private api: ApiClientService) { }

  GetReports(pageIndex: number, pageSize: number): Observable<Page<Report>> {
    return this.api.GET<any>(`${this.TABLE_NAME}/list/${pageIndex}/${pageSize}`);
  }

  GetReport(reportId: number): Observable<Report> {
    return this.api.GET<Report>(`${this.TABLE_NAME}/get/${reportId}`);
  }
}
