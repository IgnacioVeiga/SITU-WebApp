import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { BusStop } from '../models/bus-stop.model';

@Injectable({
    providedIn: 'root'
})
export class StopService {
    private readonly TABLE_NAME = 'stops';

    constructor(private api: ApiClientService) { }

    getStopsByRoute(routeId: number): Observable<BusStop[]> {
        return this.api.GET<BusStop[]>(`${this.TABLE_NAME}/route/${routeId}`);
    }

    createStop(stop: any): Observable<any> {
        return this.api.POST<any>(`${this.TABLE_NAME}`, stop);
    }

    updateStop(stopId: number, stop: any): Observable<any> {
        return this.api.PUT<any>(`${this.TABLE_NAME}/${stopId}`, stop);
    }

    deleteStop(stopId: number): Observable<any> {
        return this.api.DELETE<any>(`${this.TABLE_NAME}/${stopId}`);
    }
}
