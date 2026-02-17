import { AfterViewInit, Component, effect, input, signal } from '@angular/core';
import { BusRoute, BusStop } from '../../models/bus.model';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LeafletDrawModule } from '@bluehalo/ngx-leaflet-draw';
import * as L from 'leaflet';
import 'leaflet-draw';

@Component({
    selector: 'app-map',
    templateUrl: 'map.component.html',
    imports: [
        LeafletModule,
        LeafletDrawModule
    ]
})
export class MapComponent implements AfterViewInit {
  busRoutes = input<BusRoute[]>([]);
  busStops = input<BusStop[]>([]);

  options: L.MapOptions = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: L.latLng(-34.581231, -58.420862)
  };

  drawnItems: L.FeatureGroup = L.featureGroup();

  drawOptions: L.Control.DrawConstructorOptions = {
    edit: {
      featureGroup: this.drawnItems
    }
  };

  private readonly viewInitialized = signal(false);

  constructor() {
    effect(() => {
      const routes = this.busRoutes();
      const stops = this.busStops();

      if (!this.viewInitialized()) {
        return;
      }

      this.redrawMap(routes, stops);
    });
  }

  public onDrawCreated(event: L.DrawEvents.Created): void {
    this.drawnItems.addLayer(event.layer);
  }

  ngAfterViewInit(): void {
    this.viewInitialized.set(true);
  }

  private redrawMap(routes: BusRoute[], stops: BusStop[]): void {
    this.clearMap();

    if (routes.length > 0) {
      this.drawBusRoutes(routes);
    }

    if (stops.length > 0) {
      this.drawBusStops(stops);
    }
  }

  private clearMap(): void {
    this.drawnItems.clearLayers();
  }

  private drawBusRoutes(routes: BusRoute[]): void {
    routes.forEach((route) => {
      const geoJson = this.parseGeoJson(route.coordinates);

      if (!geoJson || geoJson.type !== 'LineString' || !Array.isArray(geoJson.coordinates)) {
        return;
      }

      const polylinePoints = geoJson.coordinates
        .filter((coord: unknown) => Array.isArray(coord) && coord.length >= 2)
        .map((coord: [number, number]) => [coord[1], coord[0]]);

      if (polylinePoints.length > 0) {
        const routeLine = L.polyline(polylinePoints as L.LatLngTuple[], { color: 'blue' });
        this.attachClickEvent(routeLine);
        this.drawnItems.addLayer(routeLine);
      }
    });
  }

  private drawBusStops(stops: BusStop[]): void {
    stops.forEach((stop) => {
      const stopGeoJson = this.parseGeoJson(stop.location);

      if (!stopGeoJson || stopGeoJson.type !== 'Point' || !Array.isArray(stopGeoJson.coordinates) || stopGeoJson.coordinates.length < 2) {
        return;
      }

      const stopCoordinates: L.LatLngTuple = [
        stopGeoJson.coordinates[1],
        stopGeoJson.coordinates[0],
      ];

      const stopMarker = L.marker(stopCoordinates, {
        icon: L.icon({
          ...L.Icon.Default.prototype.options,
          iconUrl: 'assets/marker-icon.png',
          iconRetinaUrl: 'assets/marker-icon-2x.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }).bindPopup(`<b>${stop.name}</b>`);

      this.attachClickEvent(stopMarker);
      this.drawnItems.addLayer(stopMarker);
    });
  }

  private parseGeoJson(raw: unknown): any | null {
    if (raw == null) {
      return null;
    }

    if (typeof raw === 'string') {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }

    if (typeof raw === 'object') {
      return raw;
    }

    return null;
  }

  private attachClickEvent(layer: L.Layer): void {
    layer.on('click', (event: L.LeafletMouseEvent) => {
      const layerType = layer instanceof L.Polyline ? 'LineString' : 'Point';
      const coordinates = event.latlng;
      console.log(layerType + '\n' + coordinates);
    });
  }
}
