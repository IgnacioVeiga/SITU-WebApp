import { inject, Injectable } from '@angular/core';
import { GenericAPIService } from './generic-api.service';
import { Observable } from 'rxjs';
import { BusLine } from '../models/bus.model';

@Injectable({
    providedIn: 'root'
})
export class LineService {
    private api = inject(GenericAPIService);

    getAllLines(): Observable<BusLine[]> {
        return this.api.GET<BusLine[]>('lines');
    }

    getLineById(lineId: number): Observable<BusLine> {
        return this.api.GET<BusLine>(`lines/${lineId}`);
    }

    createLine(line: Pick<BusLine, 'number' | 'name'>): Observable<BusLine> {
        return this.api.POST<BusLine>(`lines`, line);
    }

    updateLine(lineId: number, line: Pick<BusLine, 'number' | 'name'>): Observable<BusLine> {
        return this.api.PUT<BusLine>(`lines/${lineId}`, line);
    }

    deleteLine(lineId: number): Observable<void> {
        return this.api.DELETE<void>(`lines/${lineId}`);
    }
}

