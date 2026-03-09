# Frontend API Contract

Frontend assumptions for backend payloads and routes.

## Base URL

- Derived from `environment.apiBaseUrl`.
- Expected backend prefix: `/api/v1`.

## Success payloads

`GenericAPIService` supports both:

- envelope payload (`message`, `data`)
- raw DTO payloads

## Error payloads

Expected fields:

- `timestamp`
- `status`
- `error`
- `message`

## Auth/session payload assumptions

Auth responses include token metadata and session payload needed by UI.

## Detailed references

- `docs/backend-contract.md`
- `src/app/shared/services/generic-api.service.ts`
- `src/app/shared/services/auth.service.ts`