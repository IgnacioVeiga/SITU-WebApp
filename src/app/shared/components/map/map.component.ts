import { Component, AfterViewInit, input } from '@angular/core';
import * as L from 'leaflet';
import { BusRoute, BusStop } from '../../models/bus.model';

@Component({
  selector: 'app-map',
  template: `<div id="map" style="height: 100%; width: 100%;"></div>`,
  styles: `
  #map {
    height: 100vh;
  }`,
  standalone: true,
  imports: []
})
export class MapComponent implements AfterViewInit {
  busRoutes = input<BusRoute[]>([]);
  busStops = input<BusStop[]>([]);
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();

    if (this.busRoutes().length > 0) {
      this.clearMap();
      this.drawBusRoutes();
    }

    if (this.busStops().length > 0) {
      this.drawBusStops();
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

  private clearMap(): void {
    this.map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        this.map.removeLayer(layer);
      }
    });
  }

  private drawBusRoutes(): void {
    this.busRoutes().forEach(route => {
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

  private drawBusStops(): void {
    this.busStops().forEach(stop => {
      const stopGeoJson = JSON.parse(stop.location);

      if (stopGeoJson.type === 'Point' && stopGeoJson.coordinates.length >= 2) {
        const stopCoordinates: L.LatLngTuple = [stopGeoJson.coordinates[1], stopGeoJson.coordinates[0]];

        L.marker(stopCoordinates).bindPopup(`<b>${stop.name}</b>`).addTo(this.map);
      }
    });
  }
}
