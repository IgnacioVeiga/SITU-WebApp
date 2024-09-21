import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LineService } from 'src/app/shared/services/line.service';
import { RouteService } from 'src/app/shared/services/route.service';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StopService } from 'src/app/shared/services/stop.service';
import { BusLine, BusRoute, BusStop } from 'src/app/shared/models/bus.model';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MapComponent]
})
export class BusComponent {
  busLines: BusLine[] = [];
  busRoutes: BusRoute[] = [];
  busStops: BusStop[] = [];

  toastr = inject(ToastrService);
  lineService = inject(LineService);
  routeService = inject(RouteService);
  stopService = inject(StopService);

  get isLoadRoutesDisabled(): boolean {
    return !this.busLines.some(line => line.selected);
  }

  get isLoadStopsDisabled(): boolean {
    return !this.busRoutes.some(route => route.selected);
  }

  get selectedLines(): BusLine[] {
    return this.busLines.filter(line => line.selected);
  }

  get selectedRoutes(): BusRoute[] {
    return this.busRoutes.filter(route => route.selected);
  }

  ngOnInit() {
    this.loadBusLines();
  }

  loadBusLines() {
    this.lineService.getAllLines().subscribe({
      next: (lines) => {
        this.busLines = lines;
      },
      error: () => {
        this.toastr.error('Error al cargar líneas de autobuses');
      }
    });
  }

  loadBusRoutes() {
    this.busRoutes = [];
    this.busStops = [];

    this.selectedLines.forEach(line => {
      this.routeService.getRoutesByLine(line.id).subscribe({
        next: (routes) => {
          this.busRoutes.push(...routes);
        },
        error: () => {
          this.toastr.error('Error al cargar recorridos');
        }
      });
    });
  }

  loadBusStops() {
    this.busStops = [];
    
    this.selectedRoutes.forEach(route => {
      this.stopService.getStopsByRoute(route.id).subscribe({
        next: (stops) => {
          this.busStops.push(...stops);
        },
        error: () => {
          this.toastr.error('Error al cargar paradas');
        }
      });
    });
  }

  resetSelection() {
    this.busStops = [];
    this.busRoutes = [];
    this.busLines.forEach(line => line.selected = false);
  }
}
