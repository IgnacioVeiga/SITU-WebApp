# SITU WebApp (beta)
Panel web administrativo para SITU.

## Requisitos
- Node.js 20+
- npm 10+

## Configuración de API
La app arma la URL con:
- `API_URL`
- `API_PREFIX`

Por defecto:
- `environment.development.ts` -> `http://localhost:8080` + `/api/v1`
- `environment.ts` -> `https://server-situ-app.koyeb.app` + `/api/v1`

## Desarrollo
```bash
npm install
npm start
```

## Build
```bash
npm run build
```

## Notas
- El backend usa exclusivamente `/api/v1`.
- Si cambia el dominio de backend, actualizar `API_URL` en los entornos.
