import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BusCompanyModel, BusLineModel } from '../models/bus.model';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  constructor(private api: ApiService) { }

  GetBuses(): Observable<BusLineModel> {
    return this.api.GET<BusLineModel>(`buses`);
  }

  GetCompanyLogo(companyId: number): Observable<BusCompanyModel> {
    return this.api.GET<BusCompanyModel>(`busCompanies?id=${companyId}`);
  }
}
