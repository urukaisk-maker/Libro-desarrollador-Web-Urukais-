# Ejercicios resueltos — Capítulo 20

[Volver al índice](index.md) · [Capítulo original](../capitulos/20-devops.md)

## Ejercicio 1: Workflow de CI

> Configura un workflow con lint + test + build.

### Solución

`.github/workflows/ci.yml`:

```yaml
name: CI

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
```

---

## Ejercicio 2: Husky + lint-staged

> Añade Husky + lint-staged a un proyecto.

### Solución

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

---

## Ejercicio 3: Sentry

> Integra Sentry y captura un error forzado.

### Solución

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://...@sentry.io/...',
  environment: import.meta.env.MODE,
  tracesSampleRate: 0.1,
  integrations: [Sentry.browserTracingIntegration()],
});
```

**Botón de prueba:**

```javascript
<button onClick={() => {
  throw new Error('Error de prueba');
}}>
  Lanzar error
</button>
```

El error aparecerá en el panel de Sentry en segundos.

---

## Ejercicio 4: Web Vitals en producción

> Añade `web-vitals` y envía las métricas a tu backend.

### Solución

```bash
npm install web-vitals
```

```javascript
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

function enviar(metrica) {
  const cuerpo = JSON.stringify({
    name: metrica.name,
    value: metrica.value,
    id: metrica.id,
    url: location.href,
  });

  // sendBeacon envía incluso al cerrar la pestaña
  navigator.sendBeacon('/api/vitals', cuerpo);
}

onCLS(enviar);
onINP(enviar);
onLCP(enviar);
onFCP(enviar);
onTTFB(enviar);
```

---

## Ejercicio 5: Dockerfile multi-stage

> Crea un Dockerfile multi-stage para una SPA con Nginx.

### Solución

**Dockerfile:**

```dockerfile
# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: servir
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**

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

---

## Ejercicio 6: Dependabot

> Configura Dependabot para actualizar dependencias semanalmente.

### Solución

`.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: npm
    directory: /
    schedule:
      interval: weekly
      day: monday
    open-pull-requests-limit: 5

  - package-ecosystem: github-actions
    directory: /
    schedule:
      interval: monthly
```

---

## Ejercicio 7: Postmortem

> Escribe un postmortem de un bug real.

### Solución

**Formato:**

```markdown
# Postmortem: [título del incidente]

**Fecha**: 2026-10-12
**Duración**: 45 minutos
**Impacto**: usuarios no podían iniciar sesión

## Qué pasó

Descripción cronológica del incidente.

## Timeline

- **10:00** — deploy de la versión 2.3.0
- **10:05** — primeros reportes de usuarios
- **10:15** — identificado el problema
- **10:30** — rollback a 2.2.0
- **10:45** — servicio restaurado

## Causa raíz

El nuevo middleware de autenticación verificaba el token antes de que
la base de datos estuviera lista. En producción, el arranque es más
lento que en local y fallaba la verificación.

## Qué se hizo bien

- Detección rápida (5 min).
- Comunicación clara con el equipo.
- Rollback sin pérdida de datos.

## Qué mejorar

- Añadir healthcheck que espere a la BD.
- Test de integración con la BD en CI.
- Alertas automáticas por tasa de errores.

## Acciones

- [ ] Healthcheck esperando a la BD (@urukais)
- [ ] Test de integración en CI (@urukais)
- [ ] Alertas con Sentry (@urukais)
```

---

## Ejercicio 8: Staging y producción

> Despliega la misma app en staging y producción.

### Solución

**En Vercel:**

1. Crea un proyecto para `main` (producción).
2. Crea otro proyecto conectado a `staging` (staging).
3. Cada uno con sus variables de entorno.

**En GitHub Actions:**

```yaml
- name: Deploy
  run: |
    if [ "${{ github.ref }}" = "refs/heads/main" ]; then
      npx vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
    else
      npx vercel deploy --token=${{ secrets.VERCEL_TOKEN }}
    fi
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/20-devops.md)
