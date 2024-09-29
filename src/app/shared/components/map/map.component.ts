import { Component, AfterViewInit, input } from '@angular/core';
import { BusRoute, BusStop } from '../../models/bus.model';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { LeafletDrawModule } from '@bluehalo/ngx-leaflet-draw';
import { DrawEvents, featureGroup, FeatureGroup, latLng, tileLayer, polyline, marker, MapOptions, Control, icon, Icon, Layer } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: 'map.component.html',
  standalone: true,
  imports: [
    LeafletModule,
    LeafletDrawModule
  ],
})
export class MapComponent implements AfterViewInit {
  busRoutes = input<BusRoute[]>([]);
  busStops = input<BusStop[]>([]);

  options: MapOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 10,
    center: latLng(-34.581231, -58.420862)
  };

  drawnItems: FeatureGroup = featureGroup();

  drawOptions: Control.DrawConstructorOptions = {
    edit: {
      featureGroup: this.drawnItems
    }
  };

  public onDrawCreated(e: any) {
    this.drawnItems.addLayer((e as DrawEvents.Created).layer);
  }

  ngAfterViewInit(): void {
    if (this.busRoutes().length > 0) {
      this.clearMap();
      this.drawBusRoutes();
    }

    if (this.busStops().length > 0) {
      this.drawBusStops();
    }
  }

  private clearMap(): void {
    this.drawnItems.clearLayers();
  }

  private drawBusRoutes(): void {
    this.busRoutes().forEach((route) => {
      const geoJson = JSON.parse(route.coordinates);

      if (geoJson.type === 'LineString') {
        // Ensure that each coordinate has at least 2 values (lat, lng)
        const polylinePoints = geoJson.coordinates
          .filter((coord: any) => coord.length >= 2) // Filters out invalid coordinates
          .map((coord: any) => [coord[1], coord[0]]); // We invert lat/lng only if they are valid.

        // Make sure that polylinePoints has at least one valid point before drawing
        if (polylinePoints.length > 0) {
          const routeLine = polyline(polylinePoints as L.LatLngTuple[], { color: 'blue' });

          this.attachClickEvent(routeLine);
          this.drawnItems.addLayer(routeLine);
        }
      }
    });
  }

  private drawBusStops(): void {
    this.busStops().forEach((stop) => {
      const stopGeoJson = JSON.parse(stop.location);

      if (stopGeoJson.type === 'Point' && stopGeoJson.coordinates.length >= 2) {
        const stopCoordinates: L.LatLngTuple = [
          stopGeoJson.coordinates[1],
          stopGeoJson.coordinates[0],
        ];

        const stopMarker = marker(stopCoordinates, {
          icon: icon({
            ...Icon.Default.prototype.options,
            iconUrl: 'assets/marker-icon.png',
            iconRetinaUrl: 'assets/marker-icon-2x.png',
            shadowUrl: 'assets/marker-shadow.png'
          })
        }).bindPopup(`<b>${stop.name}</b>`);

        this.attachClickEvent(stopMarker);
        this.drawnItems.addLayer(stopMarker);
      }
    });
  }

  private attachClickEvent(layer: Layer): void {
    layer.on('click', (event: any) => {
      const layerType = layer instanceof polyline ? 'LineString' : 'Point';
      const coordinates = event.latlng;
      console.log(layerType + "\n" + coordinates);
    });
  }
}
