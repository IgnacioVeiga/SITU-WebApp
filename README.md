# SITU Frontend
Angular 20 web client for SITU.

This app is used as backoffice/admin UI and also includes authentication-facing screens.

## Tech stack
- Angular 20
- Angular Material
- ngx-translate
- Leaflet + leaflet-draw

## API configuration
The frontend builds backend URLs using:
- `apiBaseUrl`

Environment files:
- `src/environments/environment.ts` (`dev`)
- `src/environments/environment.qa.ts` (`qa`)
- `src/environments/environment.prod.ts` (`prod`)
- `src/environments/environment.mock.ts` (`mock`)

`mock` runs frontend-only using an in-memory API adapter (`MockApiService`) without backend dependency.

## Run locally
```bash
npm install
npm run start:dev
```

Starter scripts:

- Linux/macOS: `./scripts/run.sh [dev|qa|mock|prod] [local|docker]`
- PowerShell: `./scripts/run.ps1 [dev|qa|mock|prod] [local|docker]`
- CMD: `scripts/run.bat [dev|qa|mock|prod] [local|docker]`

`docker` mode is optional and expects `docker-compose.<env>.yml` files.
No default frontend compose files are currently tracked in this repository.

Other runtime modes:
```bash
npm run start:qa
npm run start:mock
npm run start:prod
```

## Build
```bash
npm run build
```

Environment-specific builds:
```bash
npm run build:dev
npm run build:qa
npm run build:mock
npm run build:prod
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
- `docs/DEVELOPMENT_SETUP.md`: setup and run workflow.
- `docs/ENVIRONMENTS.md`: standardized environment profile reference.
- `docs/AUTH_FLOW.md`: login/refresh/logout frontend flow.
- `docs/API_CONTRACT.md`: backend payload and endpoint assumptions.
- `docs/PROJECT_MAP.md`: source navigation map.
- `docs/TROUBLESHOOTING.md`: common frontend integration/runtime issues.
- `docs/routing.md`: route map and complaint navigation.
- `docs/backend-contract.md`: frontend assumptions about backend payloads.
- `docs/ENVIRONMENTS.md`: dev/qa/mock/prod setup.
- `docs/maps-postgis-leaflet.md`: bus map behavior and geospatial payload compatibility.

## VSCode helpers
Tracked editor helpers are available in `.vscode/`:
- `launch.json`: browser launches for dev/qa/mock/prod.
- `tasks.json`: npm tasks for start/build/test.
- `extensions.json`: recommended extensions.
