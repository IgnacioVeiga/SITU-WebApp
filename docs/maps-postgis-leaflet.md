# Maps behavior (Leaflet + PostGIS backend)

This document explains how the bus map UI works and how it integrates with backend geospatial data.

## 1. Entry point

- Page: `/bus`
- Main component: `src/app/pages/bus/bus.component.ts`
- Map renderer/editor: `src/app/shared/components/map/map.component.ts`

## 2. User flow in `/bus`

1. Select one or more bus lines.
2. Routes for selected lines are loaded (`GET /routes/line/{lineId}`).
3. Select one or more routes to show on map.
4. Stops for selected routes are loaded (`GET /stops/route/{routeId}`).
5. Optionally enable route edit mode for exactly one selected route.
6. Save route geometry (`PUT /routes/{id}`) or undo local edits.

## 3. Edit mode rules

- Edit mode requires exactly one selected route.
- The selected route is highlighted and vertex editing is enabled.
- `Undo` restores the original route geometry snapshot.
- `Save` sends a GeoJSON `LineString` with `[longitude, latitude]` coordinates.
- At least 2 points are required to save.

## 4. Coordinate and format contract

Leaflet and API use different coordinate orders:
- Leaflet rendering/editing uses `[latitude, longitude]`.
- API writes use `[longitude, latitude]`.

`MapComponent` handles conversion both ways.

Supported read formats from backend:
- GeoJSON text/object (`Point`, `LineString`)
- EWKB hex text (common for PostGIS route geometry through JDBC mapping)

This is why map parsing includes:
- GeoJSON parser
- WKB/EWKB hex parser with endian/type handling

## 5. Write payload used by frontend

Route update payload:

```json
{
  "lineId": 1,
  "name": "Linea Centro",
  "coordinates": "{\"type\":\"LineString\",\"coordinates\":[[-58.3816,-34.6037],[-58.3951,-34.6082]]}"
}
```

## 6. Display and visual behavior

- Multiple routes can be displayed simultaneously.
- Route colors are derived from route id to stay predictable.
- Stops can be toggled on/off (`showStops`).
- Map auto-fits to visible routes/stops bounds.

## 7. Troubleshooting checklist

If map is empty:
- verify at least one line and one route are selected,
- verify route has valid geometry and at least 2 points,
- check API response for `routes.coordinates` and `stops.location` values.

If save fails:
- verify outgoing payload is valid GeoJSON string,
- verify coordinate order is `[lon, lat]`,
- verify user role has permission to update routes.
