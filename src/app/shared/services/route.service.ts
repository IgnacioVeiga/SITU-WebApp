import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';
import { BusRoute } from '../models/bus-route.model';

@Injectable({
    providedIn: 'root'
})
export class RouteService {
    private readonly TABLE_NAME = 'routes';

    constructor(private api: ApiClientService) { }

    getRoutesByLine(lineId: number): Observable<BusRoute[]> {
        return this.api.GET<BusRoute[]>(`${this.TABLE_NAME}/line/${lineId}`);
    }
}
