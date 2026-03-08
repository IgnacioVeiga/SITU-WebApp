# Frontend environment strategy

SITU Frontend uses Angular file replacements:

- `development` -> `src/environments/environment.ts`
- `qa` -> `src/environments/environment.qa.ts`
- `mock` -> `src/environments/environment.mock.ts`
- `production` -> `src/environments/environment.prod.ts`

## Commands

```bash
npm run start:dev
npm run start:qa
npm run start:mock
npm run start:prod
```

```bash
npm run build:dev
npm run build:qa
npm run build:mock
npm run build:prod
```

Cross-platform wrappers:

```bash
./scripts/run.sh dev local
./scripts/run.sh qa local
./scripts/run.sh mock local
./scripts/run.sh prod local
```

PowerShell: `./scripts/run.ps1 <env> local`  
CMD: `scripts/run.bat <env> local`

`docker` mode in wrappers is optional and requires local `docker-compose.<env>.yml` files.
This repository does not include default frontend compose files.

## Notes

- `mock` profile is frontend-only and now uses an in-memory API adapter (`MockApiService`) through `GenericAPIService`.
- In `mock`, authentication and domain data are simulated locally (session, users, complaints, alerts, lines/routes/stops).
- `production` defaults to relative API (`/api/v1`) to support reverse proxy deployments.
