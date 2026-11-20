---
description: "Chapter 34 of the Web Developer's Book: 34 — Docker for Frontend. Learn step by step with examples, exercises, and quizzes."
---
# 34 — Docker for Frontend

!!! abstract "What you will learn"
    - What Docker is and why to use it for frontend.
    - Images and containers.
    - Dockerfile for a frontend app.
    - Multi-stage builds.
    - Docker Compose.

---

## 🐳 What is Docker?

**Docker** packages your application with **all its dependencies** into a container. That container behaves the same way on your laptop, on your company's server, and in production.

```
Without Docker: "it works on my machine" 🤷
With Docker:    "it works everywhere" ✅
```

!!! quote "A container is a sealed box"
    Inside it carries your app, Node.js, dependencies, and configuration. Outside, whatever operating system is running doesn't matter: it executes the same way.

---

## 📦 Images and Containers

| Concept | What It Is |
| :--- | :--- |
| **Image** | Read-only template containing the app and its dependencies |
| **Container** | Running instance of an image |
| **Dockerfile** | Recipe to build an image |
| **Registry** | Image repository (Docker Hub) |
| **Volume** | Persistent storage |
| **Network** | Virtual network between containers |

```bash
docker pull nginx:alpine
docker run -p 8080:80 nginx:alpine
docker ps
docker stop <id>
docker rm <id>
```

---

## 📝 Dockerfile for Frontend

```dockerfile
# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: serve with Nginx
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

## 🏗 Multi-Stage Build

The Dockerfile above uses **two stages**:

1. **build**: installs dependencies and builds the app (large image).
2. **runtime**: copies only static files into Nginx (small image).

| Image | Size |
| :--- | :--- |
| Single-stage | ~1 GB |
| Multi-stage | ~25 MB |

!!! tip "Always use multi-stage"
    The final image only contains Nginx and the static files. Node.js and dependencies stay in the build stage, which gets discarded.

---

## ⚙ nginx.conf

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;

  # SPA: redirect everything to index.html
  location / {
    try_files $uri$uri/ /index.html;
  }

  # Asset caching
  location ~* \.(js|css|png|jpg|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

---

## 🐙 Docker Compose

**Docker Compose** lets you define and run multiple containers at once (frontend + backend + database) with a single file.

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

## ✅ Best Practices

- ✅ **Multi-stage build**: small final image.
- ✅ **`npm ci`** instead of `npm install` in Docker (faster and reproducible).
- ✅ **`.dockerignore`** so you don't copy `node_modules`, `.git`, etc.
- ✅ **Non-root user** inside the container.
- ✅ **Layer caching**: copy `package.json` before the rest.
- ✅ **Pin versions**: `node:20.11-alpine`, not `node:latest`.
- ✅ **Healthchecks** to verify the container is healthy.
- ❌ **Don't put secrets** in the Dockerfile.

```gitignore
# .dockerignore
node_modules
.git
.env
dist
*.log
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-34">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What is a Docker image?</p>
<button class="quiz-option" data-opt="a">A) A running container</button>
<button class="quiz-option" data-opt="b">B) A read-only template with the app</button>
<button class="quiz-option" data-opt="c">C) A configuration file</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> What advantage does a multi-stage build provide?</p>
<button class="quiz-option" data-opt="a">A) Much smaller final image</button>
<button class="quiz-option" data-opt="b">B) Faster build speed</button>
<button class="quiz-option" data-opt="c">C) Better security</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which tool orchestrates multiple containers?</p>
<button class="quiz-option" data-opt="a">A) Dockerfile</button>
<button class="quiz-option" data-opt="b">B) Kubernetes</button>
<button class="quiz-option" data-opt="c">C) Docker Compose</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2034%3A%20Docker%20for%20Frontend&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F34-docker%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F34-docker%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2034%3A%20Docker%20for%20Frontend%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F34-docker%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/34-docker/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 35 — GraphQL](35-graphql.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }