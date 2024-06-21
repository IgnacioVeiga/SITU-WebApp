import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly TABLE_NAME = 'alerts';

  constructor(private api: ApiClientService) { }

  GetAlerts(pageIndex: number, pageSize: number): Observable<Page<Alert>> {
    return this.api.GET<any>(`${this.TABLE_NAME}/list/${pageIndex}/${pageSize}`);
  }

  CreateAlert(alert: Alert): Observable<Alert> {
    return this.api.POST<Alert>(`${this.TABLE_NAME}/create`, alert);
  }
}
