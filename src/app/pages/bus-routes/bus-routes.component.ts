import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BusLine } from 'src/app/shared/models/bus-line.model';
import { BusRoute } from 'src/app/shared/models/bus-route.model';
import { LineService } from 'src/app/shared/services/line.service';
import { RouteService } from 'src/app/shared/services/route.service';
import { MapComponent } from 'src/app/shared/components/map/map.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StopService } from 'src/app/shared/services/stop.service';
import { BusStop } from 'src/app/shared/models/bus-stop.model';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, MapComponent]
})
export class BusRoutesComponent {
  toastr = inject(ToastrService);
  lineService = inject(LineService);
  routeService = inject(RouteService);
  stopService = inject(StopService);

  busLines: BusLine[] = [];
  selectedLineRoutes: BusRoute[] = [];
  selectedRoutes: BusRoute[] = [];
  stops: BusStop[] = [];

  ngOnInit() {
    this.lineService.getAllLines().subscribe({
      next: (lines) => {
        this.busLines = lines;
      },
      error: () => {
        this.toastr.error('Error al cargar líneas de autobuses');
      }
    });
  }

  loadRoutes() {
    this.selectedLineRoutes = [];
    const selectedLines = this.busLines.filter(line => line.selected);

    selectedLines.forEach(line => {
      this.routeService.getRoutesByLine(line.id).subscribe({
        next: (routes) => {
          this.selectedLineRoutes.push(...routes);
        },
        error: () => {
          this.toastr.error('Error al cargar recorridos');
        }
      });
    });
  }

  loadStops() {
    this.selectedRoutes.forEach(route => {
      this.stopService.getStopsByRoute(route.id).subscribe({
        next: (stops) => {
          this.stops.push(...stops);
        },
        error: () => {
          this.toastr.error('Error al cargar paradas');
        }
      });
    });
  }

  showMap() {
    this.selectedRoutes = this.selectedLineRoutes.filter(route => route.selected);
    if (this.selectedRoutes.length > 0) {
      this.loadStops();
    }
  }
}
