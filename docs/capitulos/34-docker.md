# Capítulo 34 — Docker para frontend

## Introducción

**Docker** empaqueta tu aplicación y todas sus dependencias en un **contenedor**: una unidad ligera, portable y reproducible que funciona igual en tu portátil, en el servidor de tu compañero y en producción.

Para frontend, Docker resuelve el clásico *"en mi máquina funciona"*. Con un `Dockerfile` describes el entorno exacto y cualquiera puede reproducirlo con un solo comando.

## ¿Qué es un contenedor?

Un contenedor es como una **máquina virtual ultraligera**:

- Comparte el kernel del sistema operativo (no emula hardware).
- Arranca en milisegundos.
- Ocupa MBs en lugar de GBs.
- Es **inmutable**: una vez construido, siempre se ejecuta igual.

## Docker vs Máquina Virtual

| Aspecto | Docker | VM |
|---|---|---|
| Arranque | Segundos | Minutos |
| Tamaño | MBs | GBs |
| Sistema operativo | Comparte kernel | Completo |
| Aislamiento | Procesos | Hardware |

## Instalación

- **Linux (Arch)**: `sudo pacman -S docker docker-compose`
- **macOS/Windows**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)

Activa el servicio:
```bash
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
# Cierra sesión y vuelve a entrar
```

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Imagen** | Plantilla inmutable (receta) |
| **Contenedor** | Instancia en ejecución de una imagen |
| **Dockerfile** | Receta para construir una imagen |
| **Volume** | Almacenamiento persistente |
| **Compose** | Orquestador local multi-contenedor |

## Tu primer Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

Construir:
```bash
docker build -t mi-app .
```

Ejecutar:
```bash
docker run -p 5173:5173 mi-app
```

Visita `http://localhost:5173`.

## Multi-stage build (el estándar en producción)

En producción no necesitas `node_modules` ni el código fuente. Solo el resultado del build. **Multi-stage** permite usar una imagen para compilar y otra (mucho más ligera) para servir.

```dockerfile
# Etapa 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Resultado: de ~800 MB a ~25 MB. 🎯

## Configuración de Nginx para SPA

`nginx.conf`:

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  # SPA fallback: siempre sirve index.html si no encuentra archivo
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache largo para assets con hash
  location ~* \.(js|css|woff2|png|jpg|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # Gzip
  gzip on;
  gzip_types text/css application/javascript image/svg+xml;
}
```

## Docker Compose

Para varios servicios (frontend + backend + base de datos) usa `docker-compose.yml`:

```yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - api
    environment:
      - VITE_API_URL=http://localhost:3000

  api:
    build: ./api
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/app
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_PASSWORD=pass
      - POSTGRES_USER=user
      - POSTGRES_DB=app
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

Arrancar todo:
```bash
docker compose up -d
```

Parar:
```bash
docker compose down
```

## .dockerignore

Igual que `.gitignore`, pero para Docker. **Muy importante** para que el build sea rápido:

```
node_modules
dist
.git
.env
.env.local
*.log
.DS_Store
coverage
```

Sin este archivo, Docker copiaría `node_modules` (miles de archivos) y el build tardaría minutos en lugar de segundos.

## Volumes: persistencia

Los contenedores son **efímeros**: cuando se borran, pierden los datos. Los volumes persisten:

```yaml
volumes:
  - pgdata:/var/lib/postgresql/data
```

## Buenas prácticas

- **Usa imágenes Alpine**: mucho más ligeras (~5 MB vs ~900 MB).
- **Multi-stage builds** para producción: solo lo necesario.
- **Un proceso por contenedor**: no mezcles frontend y backend.
- **`.dockerignore` siempre**.
- **Fija versiones**: `node:20.11.0-alpine`, no `node:latest`.
- **No ejecutes como root**: crea un usuario sin privilegios.
- **Escanea vulnerabilidades**: `docker scout cves mi-imagen`.
- **Logs a stdout/stderr**, nunca a archivos dentro del contenedor.
- **Compose para desarrollo, Kubernetes para producción a gran escala**.

## Ejemplo: usuario no root

```dockerfile
FROM node:20-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --chown=app:app . .
USER app
CMD ["node", "server.js"]
```

## Ejercicios

1. Crea un Dockerfile con `node:20-alpine` para un proyecto Vite y ejecútalo con `docker run`.
2. Convierte el Dockerfile a multi-stage usando Nginx.
3. Añade un `.dockerignore` y comprueba cuánto tarda el build antes y después.
4. Crea un `docker-compose.yml` con frontend, backend y PostgreSQL.
5. Escanea tu imagen con `docker scout cves` y corrige las vulnerabilidades.

---

⬅️ [Capítulo 33 — Edge Computing](33-edge-computing.md) | ➡️ [Capítulo 35 — GraphQL](35-graphql.md)

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="a">
  <p class="quiz-question">¿Qué es un contenedor Docker?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) Un entorno ligero y aislado para ejecutar una aplicación</button>
    <button class="quiz-option" data-option="b">B) Una máquina virtual completa</button>
    <button class="quiz-option" data-option="c">C) Un lenguaje de programación</button>
  </div>
  <div class="quiz-feedback"></div>
</div>