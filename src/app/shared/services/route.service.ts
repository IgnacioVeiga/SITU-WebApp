import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Observable } from 'rxjs';
import { BusRoute } from '../models/bus.model';

export interface RouteUpsertRequest {
    lineId?: number;
    name?: string;
    coordinates?: string;
}

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private api = inject(GenericAPIService);

    getRoutesByLine(lineId: number): Observable<BusRoute[]> {
        return this.api.GET<BusRoute[]>(`routes/line/${lineId}`);
    }

    createRoute(route: RouteUpsertRequest): Observable<BusRoute> {
        return this.api.POST<BusRoute>('routes', route);
    }

    updateRoute(routeId: number, route: RouteUpsertRequest): Observable<BusRoute> {
        return this.api.PUT<BusRoute>(`routes/${routeId}`, route);
    }

    deleteRoute(routeId: number): Observable<void> {
        return this.api.DELETE<void>(`routes/${routeId}`);
    }
}
