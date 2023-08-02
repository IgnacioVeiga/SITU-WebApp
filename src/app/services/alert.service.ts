import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { AlertModel } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private api: ApiService) { }

  GetAlerts(pageIndex?: number, pageSize?: number): Observable<AlertModel> {
    return this.api.GET<AlertModel>('alerts');
  }
}
