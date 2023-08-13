import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ReportModel } from '../models/report.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private readonly TABLE_NAME = 'reports';

  constructor(private api: ApiService) { }

  GetReports(pageIndex: number, pageSize: number): Observable<ReportModel> {
    return this.api.GET<ReportModel>(`${this.TABLE_NAME}?_page=${pageIndex}&_limit=${pageSize}`);
  }

  GetReport(reportId: number): Observable<ReportModel> {
    return this.api.GET<ReportModel>(`${this.TABLE_NAME}/${reportId}`);
  }
}
