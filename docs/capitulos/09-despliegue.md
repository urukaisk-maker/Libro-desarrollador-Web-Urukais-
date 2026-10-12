# Capítulo 9 — Despliegue y hosting

## ¿Qué es desplegar?

**Desplegar** (o *deploy*) significa publicar tu web en internet para que cualquiera pueda visitarla. Hasta ahora has trabajado en local (`file://`), ahora toca subirla a un servidor.

## Opciones de hosting

| Servicio | Ideal para | Coste |
|---|---|---|
| **GitHub Pages** | Sitios estáticos (HTML/CSS/JS) | Gratis |
| **Netlify** | Sitios estáticos + funciones serverless | Gratis con límites |
| **Vercel** | Frontend moderno, frameworks (Next, Vite) | Gratis con límites |
| **Cloudflare Pages** | Estático con CDN global | Gratis |
| **Servidor VPS** | Control total (Node, PHP, Python…) | Desde 5 €/mes |

## GitHub Pages paso a paso

1. Sube tu proyecto a un repositorio en GitHub.
2. Ve a **Settings → Pages**.
3. En **Source** elige `Deploy from a branch`.
4. Selecciona la rama (`main` o `gh-pages`) y la carpeta (`/ (root)` o `/docs`).
5. Guarda. En 1–2 minutos estará en:
   ```
   https://tu-usuario.github.io/tu-repo/
   ```

!!! tip "Dominio propio"
    Puedes apuntar un dominio personalizado (ej. `milibro.dev`) a GitHub Pages. Añade un archivo `CNAME` con el dominio y configura los DNS con registros `A` o `CNAME`.

## Desplegar con Netlify

1. Regístrate en [netlify.com](https://netlify.com) con GitHub.
2. Pulsa **"Add new site" → "Import an existing project"**.
3. Autoriza tu cuenta de GitHub y elige el repositorio.
4. Configura:
   - **Build command**: `npm run build` (o déjalo vacío si es estático puro).
   - **Publish directory**: `dist` o `public`.
5. Deploy. En 1 minuto tienes URL tipo `https://tu-proyecto.netlify.app`.

## CI/CD con GitHub Actions

**CI/CD** = *Continuous Integration / Continuous Deployment*. Cada vez que hagas push, GitHub puede:

1. Instalar dependencias.
2. Ejecutar tests.
3. Construir el sitio.
4. Desplegarlo automáticamente.

Ejemplo mínimo para desplegar un sitio estático:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

## Checklist antes de publicar

- [ ] Todos los enlaces funcionan.
- [ ] Meta etiquetas (`title`, `description`) rellenas.
- [ ] Favicon configurado.
- [ ] Funciona en móvil (prueba con `F12` → responsive).
- [ ] Sin errores en la consola.
- [ ] HTTPS activo (GitHub Pages, Netlify y Vercel lo hacen automáticamente).
- [ ] Sin contraseñas ni API keys en el código.

## Ejercicios

1. Sube un proyecto simple a GitHub Pages.
2. Conecta un repositorio a Netlify y despliega.
3. Añade una GitHub Action que ejecute un linter en cada push.
4. Configura un dominio propio (si tienes uno).

---

⬅ [Capítulo 8 — APIs](08-apis.md) | ➡ [Capítulo 10 — Proyecto final](10-proyecto-final.md)
