# Frontend Auth Flow

Authentication flow summary for `SITU-Frontend`.

## Current behavior

- Login calls `POST /auth/login` and stores access token in memory.
- Refresh token is handled via HttpOnly cookie.
- Interceptor attaches bearer token to protected API requests.
- On `401`, interceptor attempts one refresh and retries original request.
- If refresh fails, local session is cleared and user is redirected to login.

## Key files

- `src/app/shared/services/auth.service.ts`
- `src/app/shared/interceptors/auth-http.interceptor.ts`
- `src/app/shared/guards/auth.guard.ts`
- `src/app/shared/interceptors/error.interceptor.ts`

## Security constraints

- Keep `withCredentials: true` for auth cookie flows.
- Do not store auth tokens in localStorage/sessionStorage.