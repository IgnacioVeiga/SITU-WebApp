# Backend contract notes

This file summarizes the payload shapes currently expected by the frontend.

## Generic API envelope
All requests go through `GenericAPIService` and expect:

```json
{
  "message": "optional-message-or-key",
  "data": {}
}
```

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

## Notes
- `report.service.ts` is currently a compatibility wrapper around `complaint.service.ts`.
- New code should use complaint naming (`complaint`) instead of report naming.
