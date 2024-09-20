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

    createLine(line: any): Observable<any> {
        return this.api.POST<any>(`${this.TABLE_NAME}`, line);
    }

    updateLine(lineId: number, line: any): Observable<any> {
        return this.api.PUT<any>(`${this.TABLE_NAME}/${lineId}`, line);
    }

    deleteLine(lineId: number): Observable<any> {
        return this.api.DELETE<any>(`${this.TABLE_NAME}/${lineId}`);
    }
}

