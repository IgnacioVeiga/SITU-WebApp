import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class StopService {
    private readonly TABLE_NAME = 'stops';

    constructor(private api: ApiClientService) { }

    getStopsByRoute(routeId: number): Observable<any[]> {
        return this.api.GET<any[]>(`${this.TABLE_NAME}/route/${routeId}`);
    }
}
