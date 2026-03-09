# Frontend Troubleshooting

Common integration/runtime issues in `SITU-Frontend`.

## 1. Login succeeds but protected calls fail

Check:

- bearer injection in auth interceptor,
- `apiBaseUrl` for current environment,
- backend role/permission response.

## 2. Session is lost on refresh/navigation

Check:

- refresh endpoint behavior,
- cookie transport with credentials,
- cookie `SameSite`/`Secure` alignment with deployment.

## 3. CORS errors in browser

Check:

- backend `CORS_ALLOWED_ORIGINS` includes exact frontend origin,
- protocol and port match,
- selected frontend environment file.

## 4. Map page shows no routes/stops

Check:

- selected line/route,
- valid route/stop geometry payload,
- parser compatibility for GeoJSON/EWKB.

## Related docs

- `docs/API_CONTRACT.md`
- `docs/maps-postgis-leaflet.md`
- `docs/routing.md`