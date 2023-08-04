import { AfterViewInit, Component } from '@angular/core';
import { BusLineModel, Line, Route } from 'src/app/models/bus.model';
import { BusService } from 'src/app/services/bus.service';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss']
})
export class BusRoutesComponent implements AfterViewInit {
  // busList: BusLineModel[] = [];
  lines: Line[] = [];
  routes: Route[] = [];

  constructor(
    private busService: BusService
  ) { }

  ngAfterViewInit(): void {
    this.busService.GetBuses().subscribe(
      (resp: any): void => {
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
      }
    );
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
