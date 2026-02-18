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

    createStop(stop: { name: string; locationGeoJson: string }): Observable<BusStop> {
        return this.api.POST<BusStop>('stops', stop);
    }

    updateStop(stopId: number, stop: { name: string; locationGeoJson: string }): Observable<BusStop> {
        return this.api.PUT<BusStop>(`stops/${stopId}`, stop);
    }

    deleteStop(stopId: number): Observable<void> {
        return this.api.DELETE<void>(`stops/${stopId}`);
    }
}
