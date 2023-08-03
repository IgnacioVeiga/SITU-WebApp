import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ReportModel } from '../models/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private api: ApiService) { }

  GetReports(pageIndex?: number, pageSize?: number): Observable<ReportModel> {
    return this.api.GET<ReportModel>('reports');
  }
}
