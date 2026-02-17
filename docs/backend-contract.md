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
- `GET /alerts/{pageIndex}/{pageSize}`
- `POST /alerts`

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
- `GET /users/{pageIndex}/{pageSize}/{companyId}`
- `GET /users/{id}`
- `POST /users`
- `PUT /users/{id}`
- `DELETE /users/{id}`

## Transit endpoints used by frontend
- `GET /lines`
- `GET /routes/line/{lineId}`
- `GET /stops/route/{routeId}`

## Image upload integration
- `POST /images/upload/user-profile` returns `data: true` when the upload succeeds.
- `GET /images/user-profile/{filename}` is a binary response used directly in image tags.

## Notes
- `report.service.ts` is currently a compatibility wrapper around `complaint.service.ts`.
- New code should use complaint naming (`complaint`) instead of report naming.
