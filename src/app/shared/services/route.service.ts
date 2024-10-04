import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Observable } from 'rxjs';
import { BusRoute } from '../models/bus.model';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private api = inject(GenericAPIService);

    getRoutesByLine(lineId: number): Observable<BusRoute[]> {
        return this.api.GET<BusRoute[]>(`routes/line/${lineId}`);
    }

    createRoute(route: BusRoute): Observable<BusRoute> {
        return this.api.POST<BusRoute>('routes', route);
    }

    updateRoute(routeId: number, route: BusRoute): Observable<BusRoute> {
        return this.api.PUT<BusRoute>(`routes/${routeId}`, route);
    }

    deleteRoute(routeId: number): Observable<any> {
        return this.api.DELETE<any>(`routes/${routeId}`);
    }
}
