# Frontend environment strategy

SITU WebApp uses Angular file replacements:

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
./run.sh dev local
./run.sh qa local
./run.sh mock local
./run.sh prod local
```

PowerShell: `./run.ps1 <env> local`  
CMD: `run.bat <env> local`

`docker` mode in wrappers is optional and requires local `docker-compose.<env>.yml` files.
This repository does not include default frontend compose files.

## Notes

- `mock` profile currently keeps real endpoint shape but enables `useMockApi` flag for future in-app mock fallback wiring.
- `production` defaults to relative API (`/api/v1`) to support reverse proxy deployments.
