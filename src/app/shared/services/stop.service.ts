import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Observable } from 'rxjs';
import { BusStop } from '../models/bus.model';

@Injectable({
    providedIn: 'root'
})
export class StopService {
    private api = inject(GenericAPIService);

    getStopsByRoute(routeId: number): Observable<BusStop[]> {
        return this.api.GET<BusStop[]>(`stops/route/${routeId}`);
    }

    createStop(stop: any): Observable<any> {
        return this.api.POST<any>('stops', stop);
    }

    updateStop(stopId: number, stop: any): Observable<any> {
        return this.api.PUT<any>(`stops/${stopId}`, stop);
    }

    deleteStop(stopId: number): Observable<any> {
        return this.api.DELETE<any>(`stops/${stopId}`);
    }
}
