import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LineService {
    private api = inject(GenericAPIService);

    getAllLines(): Observable<any[]> {
        return this.api.GET<any[]>('lines');
    }

    getLineById(lineId: number): Observable<any> {
        return this.api.GET<any>(`lines/${lineId}`);
    }

    createLine(line: any): Observable<any> {
        return this.api.POST<any>(`lines`, line);
    }

    updateLine(lineId: number, line: any): Observable<any> {
        return this.api.PUT<any>(`lines/${lineId}`, line);
    }

    deleteLine(lineId: number): Observable<any> {
        return this.api.DELETE<any>(`lines/${lineId}`);
    }
}

