import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AlertModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly TABLE_NAME = 'alerts';

  constructor(private api: ApiService) { }

  GetAlerts(pageIndex: number, pageSize: number): Observable<AlertModel> {
    return this.api.GET<AlertModel>(`${this.TABLE_NAME}?_page=${pageIndex}&_limit=${pageSize}`);
  }

  CreateAlert(alert: AlertModel): Observable<AlertModel> {
    return this.api.POST<AlertModel>(this.TABLE_NAME, alert);
  }
}
