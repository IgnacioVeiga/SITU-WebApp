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

  GetAlerts(pageIndex: number, pageSize: number, activeOnly: boolean = true): Observable<Page<Alert>> {
    return this.api.GET<Page<Alert>>(`alerts/${pageIndex}/${pageSize}`, { activeOnly });
  }

  CreateAlert(alert: Alert): Observable<Alert> {
    const payload = {
      title: alert.title,
      description: alert.description,
      location: alert.location,
      priority: alert.priority,
      startsAt: alert.startsAt,
      endsAt: alert.endsAt
    };
    return this.api.POST<Alert>('alerts', payload);
  }
}
