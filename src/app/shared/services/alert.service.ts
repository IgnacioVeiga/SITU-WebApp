import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Observable } from 'rxjs';
import { Alert } from '../models/alert.model';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private api = inject(GenericAPIService);

  GetAlerts(pageIndex: number, pageSize: number): Observable<Page<Alert>> {
    return this.api.GET<any>(`alerts/list/${pageIndex}/${pageSize}`);
  }

  CreateAlert(alert: Alert): Observable<Alert> {
    return this.api.POST<Alert>('alerts/create', alert);
  }
}
