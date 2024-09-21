import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { BusRoute } from '../models/bus.model';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private readonly TABLE_NAME = 'routes';

    constructor(private api: ApiClientService) { }

    getRoutesByLine(lineId: number): Observable<BusRoute[]> {
        return this.api.GET<BusRoute[]>(`${this.TABLE_NAME}/line/${lineId}`);
    }

    createRoute(route: BusRoute): Observable<BusRoute> {
        return this.api.POST<BusRoute>(`${this.TABLE_NAME}`, route);
    }

    updateRoute(routeId: number, route: BusRoute): Observable<BusRoute> {
        return this.api.PUT<BusRoute>(`${this.TABLE_NAME}/${routeId}`, route);
    }

    deleteRoute(routeId: number): Observable<any> {
        return this.api.DELETE<any>(`${this.TABLE_NAME}/${routeId}`);
    }
}
