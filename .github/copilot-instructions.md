# LLM Coding Instructions - SITU WebApp

Machine-oriented guidance for automated code changes in `SITU-WebApp`.
Human-facing onboarding and product docs are in `docs/`.

## 1. Repository purpose

- Angular web app for SITU backoffice/auth flows.
- Stack: Angular 20, standalone components, Angular Material, Leaflet.
- Includes login/signup/tracking screens and authenticated management pages.
- CI trigger: runs on commits to `main` (`.github/workflows/ci.yml`).

## 2. Environment model

- Compile-time environment files:
  - `environment.ts` (`dev`)
  - `environment.qa.ts` (`qa`)
  - `environment.prod.ts` (`prod`)
  - `environment.mock.ts` (`mock`, frontend-only flag)
- Do not add runtime `.env` resolution in browser code.

## 3. API and auth integration rules

- Backend contract base is `/api/v1/**`.
- Keep HTTP calls compatible with cookie-based auth (`withCredentials` where required by current services/interceptors).
- Do not persist auth tokens in `localStorage`/`sessionStorage`.
- Keep API URL composition centralized via environment values (`API_URL` + `API_PREFIX`).

## 4. Architecture and conventions

- Keep routing source of truth in `src/app/app.routes.ts` and feature route files (`*.routes.ts`).
- Reuse shared services/components before creating new abstractions.
- Keep strict typing and avoid `any` unless unavoidable.
- Preserve naming migration from legacy `report` wording to canonical `complaint` wording when touching related code.
- Keep map compatibility logic for route geometry parsing:
  - support GeoJSON and EWKB-hex route payloads,
  - preserve `lon,lat` (API) and `lat,lng` (Leaflet) conversion points.

## 5. UX and language constraints

- Code identifiers must be English.
- User-facing text can remain Spanish.
- Keep predictable UI behavior across pages (forms, tables, actions, states).

## 6. Change policy for LLM edits

- Prefer minimal, localized changes.
- If endpoint payload assumptions change, update:
  1. affected models/interfaces
  2. services consuming them
  3. related docs in `docs/`
  4. relevant tests

## 7. Verification checklist

Run when relevant:

- `npm run test:ci`
- `npm run build`

For environment/routing changes, also verify:

- `npm run build:dev`
- `npm run build:qa`
- `npm run build:mock`

## 8. Read these files first

- `README.md`
- `docs/environments.md`
- `docs/backend-contract.md`
- `docs/routing.md`
- `docs/maps-postgis-leaflet.md`
- `src/environments/environment.ts`
