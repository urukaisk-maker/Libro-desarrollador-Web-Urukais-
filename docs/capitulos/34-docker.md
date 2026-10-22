# 34 — Docker para frontend

!!! abstract "Qué vas a aprender"
    - Qué es Docker y por qué usarlo en frontend.
    - Imágenes y contenedores.
    - Dockerfile para una app frontend.
    - Multi-stage build.
    - Docker Compose.

---

## 🐳 ¿Qué es Docker?

**Docker** empaqueta tu aplicación con **todas sus dependencias** en un contenedor. Ese contenedor funciona igual en tu portátil, en el servidor de tu empresa y en producción.

```
Sin Docker: "en mi máquina funciona" 🤷
Con Docker: "funciona en todas partes" ✅
```

!!! quote "Un contenedor es una caja hermética"
    Dentro lleva tu app, Node.js, las dependencias y la configuración. Fuera da igual qué sistema operativo haya: se ejecuta igual.

---

## 📦 Imágenes y contenedores

| Concepto | Qué es |
| :--- | :--- |
| **Imagen** | Plantilla de solo lectura con la app y sus dependencias |
| **Contenedor** | Instancia en ejecución de una imagen |
| **Dockerfile** | Receta para construir una imagen |
| **Registry** | Repositorio de imágenes (Docker Hub) |
| **Volume** | Almacenamiento persistente |
| **Network** | Red virtual entre contenedores |

```bash
docker pull nginx:alpine
docker run -p 8080:80 nginx:alpine
docker ps
docker stop <id>
docker rm <id>
```

---

## 📝 Dockerfile para frontend

```dockerfile
# Etapa 1: build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
docker build -t mi-frontend .
docker run -p 8080:80 mi-frontend
```

---

## 🏗️ Multi-stage build

El Dockerfile anterior usa **dos etapas**:

1. **build**: instala dependencias y construye la app (imagen grande).
2. **runtime**: copia solo los archivos estáticos a Nginx (imagen pequeña).

| Imagen | Tamaño |
| :--- | :--- |
| Single-stage | ~1 GB |
| Multi-stage | ~25 MB |

!!! tip "Siempre multi-stage"
    La imagen final solo contiene Nginx y los archivos estáticos. Node.js y las dependencias se quedan en la etapa de build, que se descarta.

---

## ⚙️ nginx.conf

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  # SPA: redirigir todo a index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache de assets
  location ~* \.(js|css|png|jpg|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

---

## 🐙 Docker Compose

**Docker Compose** permite definir y ejecutar varios contenedores a la vez (frontend + backend + base de datos) con un solo archivo.

```yaml
# docker-compose.yml
services:
  frontend:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - api

  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/miapp
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: miapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
docker compose up -d
docker compose down
docker compose logs -f
```

---

## ✅ Buenas prácticas

- ✅ **Multi-stage build**: imagen final pequeña.
- ✅ **`npm ci`** en lugar de `npm install` en Docker (más rápido y reproducible).
- ✅ **`.dockerignore`** para no copiar `node_modules`, `.git`, etc.
- ✅ **Usuario no root** en el contenedor.
- ✅ **Cachea las capas**: copia `package.json` antes que el resto.
- ✅ **Fija versiones**: `node:20.11-alpine`, no `node:latest`.
- ✅ **Healthchecks** para saber si el contenedor está sano.
- ❌ **No metas secretos** en el Dockerfile.

```gitignore
# .dockerignore
node_modules
.git
.env
dist
*.log
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-34">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué es una imagen Docker?</p>
<button class="quiz-option" data-opt="a">A) Un contenedor en ejecución</button>
<button class="quiz-option" data-opt="b">B) Una plantilla de solo lectura con la app</button>
<button class="quiz-option" data-opt="c">C) Un archivo de configuración</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué ventaja tiene el multi-stage build?</p>
<button class="quiz-option" data-opt="a">A) Imagen final mucho más pequeña</button>
<button class="quiz-option" data-opt="b">B">Más velocidad de build</button>
<button class="quiz-option" data-opt="c">C) Más seguridad</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué herramienta orquesta varios contenedores?</p>
<button class="quiz-option" data-opt="a">A) Dockerfile</button>
<button class="quiz-option" data-opt="b">B) Kubernetes</button>
<button class="quiz-option" data-opt="c">C) Docker Compose</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2034%3A%20Docker%20para%20frontend&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F34-docker%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F34-docker%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2034%3A%20Docker%20para%20frontend%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F34-docker%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/34-docker/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 35 — GraphQL](35-graphql.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
