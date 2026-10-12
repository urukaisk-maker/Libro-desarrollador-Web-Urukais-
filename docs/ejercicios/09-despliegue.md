# Ejercicios resueltos — Capítulo 9

[Volver al índice](index.md) · [Capítulo original](../capitulos/09-despliegue.md)

## Ejercicio 1: Subir a GitHub Pages

> Sube un proyecto simple a GitHub Pages.

### Solución

1. Crea el repo en GitHub y sube tu código.
2. Settings → Pages.
3. **Source**: `Deploy from a branch`.
4. **Branch**: `main` / `/ (root)`.
5. Save.
6. En 1-2 min, tu web está en `https://TU_USUARIO.github.io/TU_REPO/`.

**Ejemplo de proyecto mínimo:**

```
mi-web/
├── index.html
├── estilos.css
└── app.js
```

---

## Ejercicio 2: Desplegar en Netlify

> Conecta un repositorio a Netlify.

### Solución

1. Regístrate en [netlify.com](https://netlify.com) con GitHub.
2. **Add new site** → **Import an existing project**.
3. Elige el repositorio.
4. Configura:
   - **Build command**: (vacío si es estático puro)
   - **Publish directory**: `.` o `dist`
5. **Deploy site**.

Cada push a `main` dispara un nuevo deploy automáticamente.

---

## Ejercicio 3: GitHub Action de lint

> Añade una GitHub Action que ejecute un linter en cada push.

### Solución

`.github/workflows/lint.yml`:

```yaml
name: Lint

on:
  push:
    branches: [main]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint
```

**`package.json` con el script:**

```json
{
  "scripts": {
    "lint": "eslint src"
  }
}
```

---

## Ejercicio 4: Dominio propio

> Configura un dominio propio (si tienes uno).

### Solución

**En GitHub Pages:**

1. Settings → Pages → Custom domain → escribe `tudominio.com`.
2. En tu registrador, añade:
   - **CNAME** `www` → `tu-usuario.github.io`
   - **A** `@` → `185.199.108.153` (y los otros 3).
3. Espera la verificación (5 min - 24 h).
4. Activa **Enforce HTTPS**.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/09-despliegue.md)
