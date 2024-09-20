import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LineService {
    private readonly TABLE_NAME = 'lines';

    constructor(private api: ApiClientService) { }

    getAllLines(): Observable<any[]> {
        return this.api.GET<any[]>(`${this.TABLE_NAME}`);
    }

    getLineById(lineId: number): Observable<any> {
        return this.api.GET<any>(`${this.TABLE_NAME}/${lineId}`);
    }
}
