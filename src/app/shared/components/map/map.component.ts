import { Component, AfterViewInit, input } from '@angular/core';
import * as L from 'leaflet';
import { BusRoute } from '../../models/bus-route.model';
import { BusStop } from '../../models/bus-stop.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
  imports: []
})
export class MapComponent implements AfterViewInit {
  routes = input<BusRoute[]>([]);
  stops = input<BusStop[]>([]);
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();

    if (this.routes().length > 0) {
      this.drawRoutes();
    }

    if (this.stops().length > 0) {
      this.drawStops();
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
      const geoJson = JSON.parse(route.coordinates);

      if (geoJson.type === 'LineString') {
        // Ensure that each coordinate has at least 2 values (lat, lng)
        const polylinePoints = geoJson.coordinates
          .filter((coord: any) => coord.length >= 2) // Filters out invalid coordinates
          .map((coord: any) => [coord[1], coord[0]]); // We invert lat/lng only if they are valid.

        // Make sure that polylinePoints has at least one valid point before drawing
        if (polylinePoints.length > 0) {
          const polyline = L.polyline(polylinePoints as L.LatLngTuple[], { color: 'blue' }).addTo(this.map);
          this.map.fitBounds(polyline.getBounds());
        }
      }
    });
  }

  private drawStops(): void {
    this.stops().forEach((stop: any) => {
      const stopGeoJson = JSON.parse(stop.location);

      if (stopGeoJson.type === 'Point' && stopGeoJson.coordinates.length >= 2) {
        const stopCoordinates: L.LatLngTuple = [stopGeoJson.coordinates[1], stopGeoJson.coordinates[0]];
            
        L.marker(stopCoordinates).bindPopup(`<b>${stop.name}</b>`).addTo(this.map);
      }
    });
  }
}
