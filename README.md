# SITU WebApp
Angular 20 web client for SITU.

This app is used as backoffice/admin UI and also includes authentication-facing screens.

## Tech stack
- Angular 20
- Angular Material
- ngx-translate
- Leaflet + leaflet-draw

## API configuration
The frontend builds backend URLs using:
- `API_URL`
- `API_PREFIX`

Current defaults:
- `src/environments/environment.development.ts` -> `http://localhost:8080` + `/api/v1`
- `src/environments/environment.ts` -> `https://server-situ-app.koyeb.app` + `/api/v1`

## Run locally
```bash
npm install
npm start
```

## Build
```bash
npm run build
```

## Tests
```bash
npm test
```

CI-oriented command:
```bash
npm run test:ci
```

`test:ci` requires Chrome/Chromium available (`CHROME_BIN` in headless runners).

## Documentation
- `docs/routing.md`: route map and complaint navigation.
- `docs/backend-contract.md`: frontend assumptions about backend payloads.
