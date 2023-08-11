import { AfterViewInit, Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BusLineModel, Line, Route } from 'src/app/shared/models/bus.model';
import { BusService } from 'src/app/shared/services/bus.service';

@Component({
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss']
})
export class BusRoutesComponent implements AfterViewInit {
  // busList: BusLineModel[] = [];
  lines: Line[] = [];
  routes: Route[] = [];

  constructor(
    private busService: BusService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.busService.GetBuses().subscribe({
      next: (resp: any): void => {
        let list: BusLineModel[] = [...resp]
        // Transformar el array de BusLineModel a Line y Route
        this.lines = list.map((busLine) => {
          return {
            number: busLine.lineNumber,
            selected: false,
          };
        });

        this.routes = [];
        list.forEach((busLine) => {
          busLine.routes.forEach((routeName) => {
            this.routes.push({
              name: routeName,
              line: busLine.lineNumber,
              selected: false,
            });
          });
        });
      },
      error: () => {
        this.toastr.error("No se pudo conectar al servidor", 'Intentelo más tarde');
      }
    });
  }

  get selectedLines(): Line[] {
    return this.lines.filter((line) => line.selected);
  }

  get selectedRoutes(): Route[] {
    return this.routes.filter((route) => {
      return this.selectedLines.some((line) => line.number === route.line && line.selected);
    });
  }

  toggleLineSelection(line: Line): void {
    line.selected = !line.selected;
  }
}
