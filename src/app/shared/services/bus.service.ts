import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { BusLineModel } from '../models/bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private readonly TABLE_NAME = 'bus';

  constructor(private api: ApiClientService) { }

  GetBuses(): Observable<BusLineModel[]> {
    return this.api.GET<any>(`${this.TABLE_NAME}/list`);
  }
}
