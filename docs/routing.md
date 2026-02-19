# Routing overview

Top-level behavior:
- `/` redirects to `/auth`
- unknown paths go to `NotFoundComponent` (`**`)

## Public/auth area
- `/auth/login`
- `/auth/signup`
- `/auth/complaint-tracking`

`/auth/complaint-tracking` allows users to query a complaint by tracking token.

## Authenticated area
- `/dashboard`
- `/complaint/all` (staff-focused)
- `/complaint/my` (all authenticated users)
- `/complaint/item/:id`
- `/alert/list`
- `/user/list`
- `/user/password`
- `/bus`

All authenticated routes are wrapped by `authGuard` and loaded inside the shared layout.

## Legacy compatibility
- `/report/...` is still routed to complaint pages for backward compatibility.

## Menu behavior
- Staff roles can access company scopes (`all complaints`, `users`, etc.).
- Any authenticated role can access `my complaints`.
