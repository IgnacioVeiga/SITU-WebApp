import { Component, effect, input, signal } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { BusRoute, BusStop } from '../../models/bus.model';

type GeoJsonPoint = { type: 'Point'; coordinates: [number, number] };
type GeoJsonLineString = { type: 'LineString'; coordinates: [number, number][] };
type GeoJsonCandidate = { type?: unknown; coordinates?: unknown };

type ParsedWkbHeader = {
    littleEndian: boolean;
    baseType: number;
    hasZ: boolean;
    hasM: boolean;
    offset: number;
};

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    imports: [LeafletModule]
})
export class MapComponent {
    busRoutes = input<BusRoute[]>([]);
    busStops = input<BusStop[]>([]);
    enableRouteEditing = input<boolean>(false);
    editableRouteId = input<number | null>(null);

    layers: L.Layer[] = [];

    options: L.MapOptions = {
        layers: [
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; OpenStreetMap contributors'
            })
        ],
        zoom: 11,
        center: L.latLng(-34.603722, -58.381592)
    };

    private readonly viewInitialized = signal(false);
    private map: L.Map | null = null;
    private editableRouteLayer: L.Polyline | null = null;
    private editableOriginalLonLat: [number, number][] = [];

    constructor() {
        effect(() => {
            const routes = this.busRoutes();
            const stops = this.busStops();
            const editingEnabled = this.enableRouteEditing();
            const editableRouteId = this.editableRouteId();

            if (!this.viewInitialized()) {
                return;
            }

            this.redrawMap(routes, stops, editingEnabled, editableRouteId);
        });
    }

    onMapReady(map: L.Map): void {
        this.map = map;
        this.viewInitialized.set(true);
        this.redrawMap(this.busRoutes(), this.busStops(), this.enableRouteEditing(), this.editableRouteId());
    }

    resetEditableRoute(): void {
        if (!this.editableRouteLayer || this.editableOriginalLonLat.length < 2) {
            return;
        }

        const latLngs = this.editableOriginalLonLat.map(
            ([longitude, latitude]) => [latitude, longitude] as L.LatLngTuple
        );

        this.editableRouteLayer.setLatLngs(latLngs);
    }

    getEditableRouteCoordinatesLonLat(): [number, number][] | null {
        if (!this.editableRouteLayer) {
            return null;
        }

        const latLngs = this.extractPolylineLatLngs(this.editableRouteLayer);
        if (latLngs.length < 2) {
            return null;
        }

        return latLngs.map((point) => [this.roundCoordinate(point.lng), this.roundCoordinate(point.lat)]);
    }

    private redrawMap(routes: BusRoute[], stops: BusStop[], editingEnabled: boolean, editableRouteId: number | null): void {
        this.disableEditableLayerEditing();

        const nextLayers: L.Layer[] = [];
        const bounds = L.latLngBounds([]);

        this.editableRouteLayer = null;
        this.editableOriginalLonLat = [];

        routes.forEach((route) => {
            const points = this.parseLineCoordinates(route.coordinates);
            if (points.length === 0) {
                return;
            }

            const isEditable = editingEnabled && editableRouteId != null && route.id === editableRouteId;
            const routeLayer = L.polyline(points, {
                color: isEditable ? '#e12885' : this.getRouteColor(route.id),
                weight: isEditable ? 5 : 4,
                opacity: 0.92
            }).bindPopup(`${route.lineNumber ?? '-'} · ${route.name}`);

            if (isEditable) {
                this.editableRouteLayer = routeLayer;
                this.editableOriginalLonLat = points.map(
                    ([lat, lng]) => [this.roundCoordinate(lng), this.roundCoordinate(lat)]
                );
            }

            nextLayers.push(routeLayer);
            bounds.extend(routeLayer.getBounds());
        });

        stops.forEach((stop) => {
            const coordinates = this.parsePointCoordinates(stop.location);
            if (!coordinates) {
                return;
            }

            const stopLayer = L.circleMarker(coordinates, {
                radius: 5,
                color: '#ffffff',
                weight: 1,
                fillColor: '#137a7f',
                fillOpacity: 0.94
            }).bindPopup(stop.name);

            nextLayers.push(stopLayer);
            bounds.extend(stopLayer.getLatLng());
        });

        this.layers = nextLayers;

        if (editingEnabled) {
            this.enableEditableLayerEditing();
        }

        if (!this.map) {
            return;
        }

        if (bounds.isValid()) {
            this.map.fitBounds(bounds.pad(0.12), { animate: false });
            return;
        }

        this.map.setView([-34.603722, -58.381592], 11, { animate: false });
    }

    private enableEditableLayerEditing(): void {
        if (!this.editableRouteLayer) {
            return;
        }

        // Leaflet Draw registers editing handlers on polyline instances.
        // We enable it automatically so users can drag vertices right away,
        // without relying on the toolbar controls.
        setTimeout(() => {
            const editableLayer = this.editableRouteLayer as unknown as {
                editing?: { enable?: () => void; disable?: () => void };
            };
            editableLayer.editing?.enable?.();
        });
    }

    private disableEditableLayerEditing(): void {
        if (!this.editableRouteLayer) {
            return;
        }

        const editableLayer = this.editableRouteLayer as unknown as {
            editing?: { enable?: () => void; disable?: () => void };
        };
        editableLayer.editing?.disable?.();
    }

    private parseLineCoordinates(raw: unknown): L.LatLngTuple[] {
        const geoJson = this.parseGeoJson(raw);

        if (geoJson?.type === 'LineString') {
            return geoJson.coordinates
                .filter((coord): coord is [number, number] => Array.isArray(coord) && coord.length >= 2)
                .map((coord) => [coord[1], coord[0]] as L.LatLngTuple);
        }

        if (typeof raw === 'string') {
            return this.parseWkbLineString(raw);
        }

        return [];
    }

    private parsePointCoordinates(raw: unknown): L.LatLngTuple | null {
        const geoJson = this.parseGeoJson(raw);

        if (geoJson?.type === 'Point' && Array.isArray(geoJson.coordinates) && geoJson.coordinates.length >= 2) {
            return [geoJson.coordinates[1], geoJson.coordinates[0]];
        }

        if (typeof raw === 'string') {
            return this.parseWkbPoint(raw);
        }

        return null;
    }

    private parseGeoJson(raw: unknown): GeoJsonPoint | GeoJsonLineString | null {
        if (raw == null) {
            return null;
        }

        if (typeof raw === 'object') {
            const objectValue = raw as GeoJsonCandidate;
            if (
                (objectValue.type === 'Point' || objectValue.type === 'LineString') &&
                objectValue.coordinates !== undefined
            ) {
                return objectValue as GeoJsonPoint | GeoJsonLineString;
            }
            return null;
        }

        if (typeof raw !== 'string') {
            return null;
        }

        try {
            const parsed = JSON.parse(raw) as GeoJsonCandidate;
            if ((parsed.type === 'Point' || parsed.type === 'LineString') && parsed.coordinates !== undefined) {
                return parsed as GeoJsonPoint | GeoJsonLineString;
            }
            return null;
        } catch {
            return null;
        }
    }

    private parseWkbLineString(rawHex: string): L.LatLngTuple[] {
        const bytes = this.hexToBytes(rawHex);
        if (!bytes) {
            return [];
        }

        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const header = this.parseWkbHeader(view);
        if (!header || header.baseType !== 2) {
            return [];
        }

        let offset = header.offset;
        if (offset + 4 > view.byteLength) {
            return [];
        }

        const pointsCount = view.getUint32(offset, header.littleEndian);
        offset += 4;

        const points: L.LatLngTuple[] = [];

        for (let index = 0; index < pointsCount; index++) {
            if (offset + 16 > view.byteLength) {
                return [];
            }

            const longitude = view.getFloat64(offset, header.littleEndian);
            offset += 8;
            const latitude = view.getFloat64(offset, header.littleEndian);
            offset += 8;

            points.push([latitude, longitude]);

            if (header.hasZ) {
                offset += 8;
            }
            if (header.hasM) {
                offset += 8;
            }
        }

        return points;
    }

    private parseWkbPoint(rawHex: string): L.LatLngTuple | null {
        const bytes = this.hexToBytes(rawHex);
        if (!bytes) {
            return null;
        }

        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const header = this.parseWkbHeader(view);
        if (!header || header.baseType !== 1) {
            return null;
        }

        let offset = header.offset;
        if (offset + 16 > view.byteLength) {
            return null;
        }

        const longitude = view.getFloat64(offset, header.littleEndian);
        offset += 8;
        const latitude = view.getFloat64(offset, header.littleEndian);

        return [latitude, longitude];
    }

    private parseWkbHeader(view: DataView): ParsedWkbHeader | null {
        if (view.byteLength < 5) {
            return null;
        }

        let offset = 0;
        const littleEndian = view.getUint8(offset) === 1;
        offset += 1;

        const rawType = view.getUint32(offset, littleEndian);
        offset += 4;

        const hasSrid = (rawType & 0x20000000) !== 0;
        const explicitZ = (rawType & 0x80000000) !== 0;
        const explicitM = (rawType & 0x40000000) !== 0;

        const geometryType = rawType & 0x0fffffff;
        const baseType = geometryType % 1000;
        const dimensionCode = Math.floor(geometryType / 1000);

        const hasZ = explicitZ || dimensionCode === 1 || dimensionCode === 3;
        const hasM = explicitM || dimensionCode === 2 || dimensionCode === 3;

        if (hasSrid) {
            if (offset + 4 > view.byteLength) {
                return null;
            }
            offset += 4;
        }

        return {
            littleEndian,
            baseType,
            hasZ,
            hasM,
            offset
        };
    }

    private hexToBytes(rawHex: string): Uint8Array | null {
        const normalized = rawHex.replace(/^\\x/i, '').trim();

        if (normalized.length === 0 || normalized.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(normalized)) {
            return null;
        }

        const bytes = new Uint8Array(normalized.length / 2);

        for (let index = 0; index < normalized.length; index += 2) {
            bytes[index / 2] = Number.parseInt(normalized.substring(index, index + 2), 16);
        }

        return bytes;
    }

    private extractPolylineLatLngs(polyline: L.Polyline): L.LatLng[] {
        const latLngs = polyline.getLatLngs();
        if (!Array.isArray(latLngs) || latLngs.length === 0) {
            return [];
        }

        if (Array.isArray(latLngs[0])) {
            return (latLngs[0] as L.LatLng[]) ?? [];
        }

        return latLngs as L.LatLng[];
    }

    private roundCoordinate(value: number): number {
        return Math.round(value * 1_000_000) / 1_000_000;
    }

    private getRouteColor(routeId: number): string {
        const palette = ['#137a7f', '#1d8aa0', '#0f5f74', '#e12885', '#2f9f98', '#4a7f9f'];
        return palette[Math.abs(routeId) % palette.length];
    }
}
