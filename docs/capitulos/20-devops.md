# 20 — DevOps para frontend

!!! abstract "Qué vas a aprender"
    - Qué es DevOps y por qué afecta al frontend.
    - CI/CD con GitHub Actions.
    - Docker para frontend.
    - Monitorización y logs.
    - Buenas prácticas de despliegue.

---

## 🚀 ¿Qué es DevOps?

**DevOps** es la cultura y las prácticas que unen **desarrollo** y **operaciones** para entregar software más rápido y con menos errores. Para un frontend, significa automatizar builds, tests y despliegues.

!!! quote "Si lo haces más de dos veces, automatízalo"
    DevOps no es una herramienta, es una forma de trabajar: si un proceso manual se repite, conviértelo en un script o un workflow.

---

## 🔄 CI/CD

| Concepto | Qué significa |
| :--- | :--- |
| **CI** (Continuous Integration) | Integrar cambios frecuentemente, ejecutando tests automáticos |
| **CD** (Continuous Delivery) | El código está siempre listo para desplegar |
| **CD** (Continuous Deployment) | Cada cambio se despliega automáticamente |

---

## ⚙️ GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci
      - run: npm run test
      - run: npm run build

      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

!!! tip "Qué hace este workflow"
    1. Se ejecuta en cada push a main.
    2. Instala Node.js 20 y las dependencias.
    3. Ejecuta los tests.
    4. Construye el proyecto.
    5. Lo publica en GitHub Pages.

---

## 🐳 Docker para frontend

**Docker** empaqueta tu app con todas sus dependencias para que funcione igual en cualquier entorno.

```dockerfile
# Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t mi-frontend .
docker run -p 8080:80 mi-frontend
```

!!! tip "Multi-stage build"
    El Dockerfile anterior usa dos etapas: una para construir y otra para servir. Así la imagen final es mucho más pequeña (solo Nginx + los archivos estáticos).

---

## 📊 Monitorización

| Herramienta | Qué mide |
| :--- | :--- |
| **Sentry** | Errores en producción con stack trace |
| **LogRocket** | Sesiones de usuario (grabación de pantalla) |
| **Google Analytics 4** | Tráfico y comportamiento |
| **Vercel Analytics** | Core Web Vitals reales |
| **UptimeRobot** | Disponibilidad del sitio |

```javascript
// Sentry
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://tu-dsn@sentry.io/123",
  environment: "production",
  tracesSampleRate: 0.1
});
```

---

## ✅ Buenas prácticas de despliegue

- ✅ **Despliega desde main**: no despliegues manualmente desde local.
- ✅ **Ejecuta tests antes de desplegar**: si un test falla, no se despliega.
- ✅ **Usa variables de entorno**: nunca metas secretos en el código.
- ✅ **Versiona los releases**: usa tags de Git (`v1.0.0`).
- ✅ **Rollback fácil**: poder volver a la versión anterior en minutos.
- ✅ **Monitoriza después de desplegar**: los errores no avisan solos.
- ✅ **Notifica al equipo**: Slack, Discord o email tras cada despliegue.
- ❌ **No despliegues los viernes**: si algo falla, nadie está para arreglarlo.

---

## 🔐 Variables de entorno

```bash
# .env (nunca lo subas a GitHub)
VITE_API_URL=https://api.miapp.com
VITE_ANALYTICS_ID=G-XXXXXXX
```

```javascript
// En el código
const apiUrl = import.meta.env.VITE_API_URL;
```

```gitignore
# .gitignore
.env
.env.local
.env.*.local
```

!!! warning "Nunca subas el .env"
    Si subes un .env con secretos a GitHub, considéralos comprometidos. Rótalos inmediatamente.

---

## 📦 Versionado semántico

```
MAJOR.MINOR.PATCH
1.2.3
```

| Cambio | Qué incrementa | Ejemplo |
| :--- | :--- | :--- |
| **MAJOR** | Cambios incompatibles | 1.0.0 → 2.0.0 |
| **MINOR** | Nueva funcionalidad compatible | 1.0.0 → 1.1.0 |
| **PATCH** | Corrección de bugs | 1.0.0 → 1.0.1 |

```bash
git tag v1.0.0
git push origin v1.0.0
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-20">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué significa CI en CI/CD?</p>
<button class="quiz-option" data-opt="a">A) Code Inspector</button>
<button class="quiz-option" data-opt="b">B) Continuous Integration</button>
<button class="quiz-option" data-opt="c">C) Cloud Infrastructure</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué herramienta se usa para automatizar despliegues en GitHub?</p>
<button class="quiz-option" data-opt="a">A) GitHub Actions</button>
<button class="quiz-option" data-opt="b">B) GitHub Pages</button>
<button class="quiz-option" data-opt="c">C) GitHub Issues</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué hace Docker?</p>
<button class="quiz-option" data-opt="a">A) Minifica el código</button>
<button class="quiz-option" data-opt="b">B) Ejecuta tests</button>
<button class="quiz-option" data-opt="c">C) Empaqueta la app y sus dependencias en un contenedor</button>
</div>
</div>
<div class="chapter-complete-wrapper">
  <button class="chapter-complete-btn" data-chapter="N">✅ He completado este capítulo</button>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2020%3A%20DevOps%20para%20frontend&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F20-devops%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F20-devops%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2020%3A%20DevOps%20para%20frontend%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F20-devops%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/20-devops/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## 🏆 ¡Has terminado el Nivel Profesional!

Si has llegado hasta aquí, ya sabes:

- Node.js y Express para crear APIs
- Prisma y PostgreSQL para bases de datos
- Autenticación con JWT
- CI/CD con GitHub Actions
- Docker para frontend
- Monitorización y buenas prácticas de despliegue

!!! quote "Enhorabuena"
    Has pasado de frontend a full-stack. Ahora toca el **Nivel Experto**: Web Components, PWA, WebSockets, animaciones avanzadas y design systems.

---

## ➡️ Siguiente paso

[Ir al Capítulo 21 — Web Components](21-web-components.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
