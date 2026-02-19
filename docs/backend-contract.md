# Backend contract notes

This file summarizes the payload shapes currently expected by the frontend.

## Generic API envelope
All requests sent through `GenericAPIService` expect:

```json
{
  "message": "optional-message-or-key",
  "data": {}
}
```

`message` may be either:
- a translation key (for example `ERRORS.AUTH.INVALID_CREDENTIALS`), or
- a plain human-readable message.

## Auth and session model
- Cookie-based authentication (`authToken` HttpOnly cookie).
- Frontend requests must include credentials (`withCredentials: true`).
- Session payload returned by `/auth/login` and `/auth/session`:
  - `userId`
  - `companyId`
  - `logoImageURL`
  - `email`
  - `fullName`
  - `role`

## Complaint payload (read)
Important fields used by UI:
- `id`
- `reporter.fullName`
- `description`
- `state`
- `priority`
- `createdAt`
- `trackingToken`
- `maskedContactEmail`
- `maskedContactPhone`

## Complaint endpoints used by frontend
- `GET /complaints/{pageIndex}/{pageSize}`
- `GET /complaints/mine/{pageIndex}/{pageSize}`
- `GET /complaints/{id}`
- `GET /complaints/tracking/{trackingToken}`

## Alert payload (read)
Important fields:
- `id`
- `title`
- `description`
- `alertDate`
- `priority`
- `location`
- `active`
- `startsAt`
- `endsAt`

## Alert endpoints used by frontend
- `GET /alerts/{pageIndex}/{pageSize}?activeOnly={true|false}`
- `POST /alerts`
- `PATCH /alerts/{id}`

Request body for alert creation:
```json
{
  "title": "Road blocked",
  "description": "Main avenue closed due to an incident",
  "location": "CABA",
  "priority": "HIGH",
  "startsAt": "2026-02-17T18:00:00Z",
  "endsAt": null
}
```

## Users endpoints used by frontend
- `GET /users/{pageIndex}/{pageSize}`
- `GET /users/{id}`
- `POST /users`
- `PUT /users/{id}`
- `DELETE /users/{id}`

## Transit endpoints used by frontend
- `GET /lines`
- `GET /routes/line/{lineId}`
- `GET /stops/route/{routeId}`
- `PUT /routes/{id}` (route editing)

## Geospatial payload compatibility
- Route write payload:
  - field `coordinates` is a stringified GeoJSON `LineString`.
  - coordinate order must be `[longitude, latitude]`.
- Route read payload:
  - backend can return either GeoJSON text or EWKB-hex text.
  - frontend map parser supports both formats.
- Stop read payload:
  - GeoJSON `Point` text.

## Image upload integration
- `POST /images/upload/user-profile` returns `ApiResponse<Void>` (`data` is `null`).
- `GET /images/user-profile/{filename}` is a binary response used directly in image tags.

## Notes
- `report.service.ts` is currently a compatibility wrapper around `complaint.service.ts`.
- New code should use complaint naming (`complaint`) instead of report naming.
