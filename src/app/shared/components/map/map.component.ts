import { Component, AfterViewInit, input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: []
})
export class MapComponent implements AfterViewInit {
  routes = input<any[]>([]);
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();

    if (this.routes.length > 0) {
      this.drawRoutes();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-34.581231, -58.420862],
      zoom: 15
    });

    // OpenStreetMap layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
    }).addTo(this.map);
  }

  private drawRoutes(): void {
    this.routes().forEach(route => {
      const polylinePoints = route.coordinates.map((coord: any) => [coord.lat, coord.lng]);
      const polyline = L.polyline(polylinePoints, { color: 'blue' }).addTo(this.map);
      
      this.map.fitBounds(polyline.getBounds());

      route.stops.forEach((stop: any) => {
        L.marker([stop.lat, stop.lng])
          .bindPopup(`<b>Parada: </b> ${stop.name}`)
          .addTo(this.map);
      });
    });
  }
}
