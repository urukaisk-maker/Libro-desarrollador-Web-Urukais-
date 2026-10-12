# Capítulo 20 — DevOps para frontend

## Introducción

**DevOps** es la cultura y el conjunto de prácticas que unen **desarrollo** y **operaciones**. En el mundo frontend, significa:

- Automatizar builds, tests y despliegues.
- Monitorizar el rendimiento real de la aplicación.
- Detectar errores en producción antes de que los usuarios se quejen.
- Gestionar versiones y entornos de forma reproducible.

Este capítulo te da las herramientas para llevar tu código desde tu máquina hasta producción con confianza.

## CI/CD: la base

**CI** (*Continuous Integration*): cada push dispara tests y validaciones.
**CD** (*Continuous Delivery/Deployment*): cada cambio validado se despliega automáticamente.

### GitHub Actions

El estándar de facto. Los workflows se definen en `.github/workflows/*.yml`.

### Pipeline completo

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Instalar dependencias
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Tests
        run: npm run test:run

      - name: Build
        run: npm run build

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Desplegar
        run: npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
```

!!! tip "npm ci en lugar de npm install"
    En CI, usa `npm ci`. Es más rápido, reproducible y falla si `package-lock.json` no está sincronizado.

## Validaciones automáticas

### Linting con ESLint

```bash
npm install -D eslint
npx eslint --init
```

```json
{
  "scripts": {
    "lint": "eslint src --max-warnings 0"
  }
}
```

### Formateo con Prettier

```bash
npm install -D prettier
```

`.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

Añade scripts:

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Husky + lint-staged

Ejecuta lint y formato **antes de cada commit**:

```bash
npm install -D husky lint-staged
npx husky init
```

`package.json`:

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss}": ["prettier --write"],
    "*.md": ["prettier --write"]
  }
}
```

`.husky/pre-commit`:

```
npx lint-staged
```

## Versionado semántico

**SemVer**: `MAYOR.MENOR.PARCHE`

- **MAYOR**: cambios incompatibles.
- **MENOR**: nuevas funcionalidades compatibles.
- **PARCHE**: corrección de errores.

Ejemplo: `1.4.2` → `2.0.0` (breaking change).

Gestionado con **Changesets**:

```bash
npm install -D @changesets/cli
npx changeset init
npx changeset        # describe el cambio
npx changeset version
```

## Monitorización y errores

### Sentry

Captura errores en producción con contexto (navegador, usuario, stacktrace).

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://...@sentry.io/...',
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
});
```

Con Sentry ves:

- Errores agrupados por tipo.
- Cuántos usuarios afectados.
- Stack trace con source maps.
- Releases y regresiones.

### Web Vitals en producción

Envía las métricas reales de tus usuarios:

```bash
npm install web-vitals
```

```javascript
import { onCLS, onINP, onLCP } from 'web-vitals';

function enviar({ name, value, id }) {
  navigator.sendBeacon('/api/vitals', JSON.stringify({ name, value, id }));
}

onCLS(enviar);
onINP(enviar);
onLCP(enviar);
```

Analiza en tu backend o con servicios como [Vercel Analytics](https://vercel.com/analytics) o [SpeedCurve](https://www.speedcurve.com/).

### Logs estructurados

En backend, usa **pino**:

```bash
npm install pino
```

```javascript
import pino from 'pino';

const logger = pino({ level: 'info' });

logger.info({ userId: 42 }, 'Usuario logueado');
logger.error({ err }, 'Fallo al guardar');
```

En frontend, considera herramientas como **LogRocket** o **Datadog RUM** para sesiones grabadas.

## Feature flags

Permiten activar/desactivar funcionalidades **sin desplegar**. Útil para:

- Lanzamientos graduales.
- Pruebas A/B.
- Kill switches.

```javascript
const flags = {
  nuevoDiseno: false,
};

if (flags.nuevoDiseno) {
  // nuevo layout
} else {
  // layout clásico
}
```

En serio, con **LaunchDarkly**, **Unleash** o **PostHog**.

## Entornos

Separa al menos tres entornos:

| Entorno | URL | Cuándo |
|---|---|---|
| **Development** | `localhost` | Desarrollo local |
| **Staging** | `staging.miapp.com` | Pruebas antes de producción |
| **Production** | `miapp.com` | Usuarios reales |

Cada uno con sus propias variables de entorno, base de datos y claves.

## Docker para frontend

Aunque el frontend no lo necesite para desarrollo, Docker ayuda a garantizar reproducibilidad.

### Dockerfile para SPA

```dockerfile
# Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  # SPA fallback
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache largo para assets con hash
  location ~* \.(js|css|woff2|png|jpg|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### Docker Compose

```yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
  api:
    build: ./api
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

## Secretos y seguridad

- **Nunca** metas secretos en el repositorio.
- Usa **GitHub Secrets** para CI/CD.
- En Vercel/Netlify: variables en su panel.
- **Rota las claves** periódicamente.
- **Escanea dependencias**:

```bash
npm audit
npm audit fix
```

Añade **Dependabot** para PRs automáticos de actualización:

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
```

## Rollbacks

Un buen despliegue permite **volver atrás en segundos**.

- **Vercel/Netlify**: historial de deploys con "Promote to production".
- **Docker + Kubernetes**: `kubectl rollout undo`.
- **S3 + CloudFront**: versionar el bucket.

Siempre ten un plan B. **Si el despliegue rompe producción, debes poder revertir en menos de 60 segundos.**

## Postmortems

Cuando algo falle en producción, escribe un **postmortem** sin culpar a nadie:

1. **Qué pasó**.
2. **Impacto**.
3. **Timeline**.
4. **Causa raíz**.
5. **Qué se hizo bien**.
6. **Acciones para evitar que se repita**.

Es la mejor forma de aprender de los errores.

## Buenas prácticas

- **CI en cada PR**. Nunca mergees sin tests en verde.
- **Deploys pequeños y frecuentes**. Mejor que uno grande cada mes.
- **Feature flags** para cambios de riesgo.
- **Monitoriza en producción**. Los usuarios son tu mejor test.
- **Alertas útiles**. Solo lo que requiere acción inmediata.
- **Documenta el proceso**. Onboarding rápido.
- **Rollback fácil**. Automatizado.
- **Automatiza todo** lo repetitivo.
- **Backups regulares** de la base de datos.
- **Ambiente staging** que refleje producción.

## Ejercicios

1. Configura un workflow de GitHub Actions con lint + test + build.
2. Añade Husky + lint-staged a un proyecto tuyo.
3. Integra Sentry en una app y captura un error forzado.
4. Añade `web-vitals` y envía las métricas a tu backend.
5. Crea un Dockerfile multi-stage para una SPA con Nginx.
6. Configura Dependabot para actualizar dependencias semanalmente.
7. Escribe un postmortem de un bug real que hayas tenido.
8. Despliega la misma app en staging y producción con diferentes variables.

---

⬅️ [Capítulo 19 — Full-stack con Node.js](19-fullstack-node.md) | ➡️ [Apéndices](../apendices/index.md)
