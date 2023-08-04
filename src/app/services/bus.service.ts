import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BusLineModel } from '../models/bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private readonly TABLE_NAME = 'buses';

  constructor(private api: ApiService) { }

  GetBuses(): Observable<BusLineModel> {
    return this.api.GET<BusLineModel>(`${this.TABLE_NAME}`);
  }
}
