import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { BusLine, BusRoute, BusStop } from 'src/app/shared/models/bus.model';
import { LineService } from 'src/app/shared/services/line.service';
import { RouteService } from 'src/app/shared/services/route.service';
import { StopService } from 'src/app/shared/services/stop.service';

@Component({
    selector: 'app-bus',
    templateUrl: './bus.component.html',
    styleUrls: ['./bus.component.scss'],
    imports: [
        FormsModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule,
        PageHeaderComponent,
        MapComponent
    ]
})
export class BusComponent implements OnInit {
    busLines: BusLine[] = [];
    busRoutes: BusRoute[] = [];
    busStops: BusStop[] = [];

    showStops: boolean = true;
    isLoadingLines: boolean = false;
    isLoadingRoutes: boolean = false;
    isLoadingStops: boolean = false;

    private readonly toastr = inject(ToastrService);
    private readonly lineService = inject(LineService);
    private readonly routeService = inject(RouteService);
    private readonly stopService = inject(StopService);

    get selectedLines(): BusLine[] {
        return this.busLines.filter((line) => line.selected);
    }

    get selectedRoutes(): BusRoute[] {
        return this.busRoutes.filter((route) => route.selected);
    }

    ngOnInit(): void {
        this.loadBusLines();
    }

    trackByLineId(index: number, line: BusLine): number {
        return line.id;
    }

    trackByRouteId(index: number, route: BusRoute): number {
        return route.id;
    }

    onLineSelectionChanged(): void {
        this.busStops = [];
        this.loadRoutesForSelectedLines();
    }

    onRouteSelectionChanged(): void {
        this.loadStopsForSelectedRoutes();
    }

    resetSelection(): void {
        this.busLines = this.busLines.map((line) => ({ ...line, selected: false }));
        this.busRoutes = [];
        this.busStops = [];
        this.showStops = true;
    }

    getPageSubtitle(): string {
        const selectedLines = this.selectedLines.length;
        const selectedRoutes = this.selectedRoutes.length;
        return `${selectedLines} líneas seleccionadas · ${selectedRoutes} recorridos activos en mapa`;
    }

    private loadBusLines(): void {
        this.isLoadingLines = true;

        this.lineService
            .getAllLines()
            .pipe(finalize(() => (this.isLoadingLines = false)))
            .subscribe({
                next: (lines) => {
                    this.busLines = lines
                        .map((line) => ({ ...line, selected: false }))
                        .sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }));
                },
                error: () => {
                    this.toastr.error('No se pudieron cargar las líneas de la empresa.');
                }
            });
    }

    private loadRoutesForSelectedLines(): void {
        const selectedLines = this.selectedLines;

        if (selectedLines.length === 0) {
            this.busRoutes = [];
            this.busStops = [];
            return;
        }

        const previouslySelectedRouteIds = new Set(this.selectedRoutes.map((route) => route.id));
        let hadErrors = false;

        this.isLoadingRoutes = true;

        forkJoin(
            selectedLines.map((line) =>
                this.routeService.getRoutesByLine(line.id).pipe(
                    map((routes) =>
                        routes.map((route) => ({
                            ...route,
                            lineId: line.id,
                            lineName: line.name,
                            lineNumber: line.number
                        }))
                    ),
                    catchError(() => {
                        hadErrors = true;
                        return of([] as BusRoute[]);
                    })
                )
            )
        )
            .pipe(finalize(() => (this.isLoadingRoutes = false)))
            .subscribe((routeGroups) => {
                const uniqueRoutes = new Map<number, BusRoute>();

                routeGroups
                    .flat()
                    .forEach((route) => {
                        if (!uniqueRoutes.has(route.id)) {
                            uniqueRoutes.set(route.id, route);
                        }
                    });

                this.busRoutes = Array.from(uniqueRoutes.values())
                    .map((route) => ({
                        ...route,
                        selected: previouslySelectedRouteIds.has(route.id)
                    }))
                    .sort((a, b) => {
                        const byLine = (a.lineNumber ?? '').localeCompare(b.lineNumber ?? '', undefined, { numeric: true });
                        if (byLine !== 0) {
                            return byLine;
                        }
                        return a.name.localeCompare(b.name);
                    });

                if (hadErrors) {
                    this.toastr.warning('Algunos recorridos no pudieron cargarse.');
                }

                if (this.selectedRoutes.length > 0) {
                    this.loadStopsForSelectedRoutes();
                    return;
                }

                this.busStops = [];
            });
    }

    private loadStopsForSelectedRoutes(): void {
        const selectedRoutes = this.selectedRoutes;

        if (selectedRoutes.length === 0) {
            this.busStops = [];
            return;
        }

        let hadErrors = false;

        this.isLoadingStops = true;

        forkJoin(
            selectedRoutes.map((route) =>
                this.stopService.getStopsByRoute(route.id).pipe(
                    map((stops) =>
                        stops.map((stop) => ({
                            ...stop,
                            routeId: route.id
                        }))
                    ),
                    catchError(() => {
                        hadErrors = true;
                        return of([] as BusStop[]);
                    })
                )
            )
        )
            .pipe(finalize(() => (this.isLoadingStops = false)))
            .subscribe((stopGroups) => {
                const uniqueStops = new Map<number, BusStop>();

                stopGroups
                    .flat()
                    .forEach((stop) => {
                        if (!uniqueStops.has(stop.id)) {
                            uniqueStops.set(stop.id, stop);
                        }
                    });

                this.busStops = Array.from(uniqueStops.values());

                if (hadErrors) {
                    this.toastr.warning('Algunas paradas no pudieron cargarse.');
                }
            });
    }
}
