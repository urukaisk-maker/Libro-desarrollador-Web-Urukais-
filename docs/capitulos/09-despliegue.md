# 09 — Despliegue

!!! abstract "Qué vas a aprender"
    - Qué significa "desplegar" una aplicación web.
    - Hosting estático vs hosting dinámico.
    - Plataformas recomendadas: Vercel, Netlify, GitHub Pages, Cloudflare Pages.
    - CI/CD con GitHub Actions.
    - Variables de entorno, dominios y HTTPS.
    - Rollback y monitorización básica.

---

## 🚀 ¿Qué es desplegar?

**Desplegar** (deploy) es publicar tu aplicación en un servidor accesible desde internet. Hasta ese momento, tu web solo existe en tu ordenador (`localhost`). Al desplegar, obtiene una URL pública y cualquier persona puede visitarla.

!!! quote "La analogía del escaparate"
    Tu proyecto en local es el **taller** donde construyes el escaparate. Desplegar es **abrir la tienda al público**: montar el escaparate en la calle, encender las luces y colgar el cartel.

~~~mermaid
graph LR
    A[Tu código] --> B[Repositorio Git]
    B --> C[CI/CD]
    C --> D[Servidor]
    D --> E[URL pública]
~~~

---

## 🏛 Tipos de hosting

| Tipo | Qué sirve | Ejemplos | Coste típico |
| :--- | :--- | :--- | :--- |
| **Estático** | HTML, CSS, JS, imágenes (sin backend) | GitHub Pages, Netlify, Cloudflare Pages | Gratis |
| **Serverless / JAMstack** | Estático + funciones bajo demanda | Vercel, Netlify Functions | Gratis con límites |
| **PaaS** | Node.js, Python, etc. con servidor gestionado | Railway, Render, Fly.io | 0–5 €/mes |
| **IaaS / VPS** | Servidor completo (tú gestionas todo) | DigitalOcean, Hetzner, AWS EC2 | 5–20 €/mes |
| **Contenedores** | Docker orquestado | AWS ECS, Google Cloud Run, Fly.io | Pago por uso |

!!! tip "Empieza con estático"
    Si tu proyecto es HTML + CSS + JS, un hosting estático es **gratis, rápido y con HTTPS automático**. Sube el listón solo cuando necesites backend.

---

## 🎯 Plataformas recomendadas

### GitHub Pages (estático, gratis)

Perfecto para documentación, portfolios y proyectos personales.

~~~yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - uses: actions/deploy-pages@v4
~~~

!!! warning "Sin backend"
    GitHub Pages solo sirve archivos estáticos. No ejecuta Node.js, Python ni bases de datos.

### Vercel (Next.js, React, estático + funciones)

~~~bash
npm i -g vercel
vercel
~~~

- Detección automática de framework (Next.js, Vite, Astro…).
- **Preview deployments** por cada PR (URL temporal).
- Funciones serverless incluidas.
- HTTPS y dominio gratis.
- Free tier generoso para proyectos personales.

### Netlify (estático + funciones)

- Similar a Vercel, muy popular para JAMstack.
- Formularios integrados (`<form netlify>`).
- Funciones serverless en `netlify/functions/`.
- Split testing A/B integrado.

### Cloudflare Pages + Workers

- CDN global (300+ PoPs).
- Free tier muy generoso.
- **Workers** para lógica en el edge (ver capítulo 33).
- Ideal si combinas estático + edge functions.

### Railway / Render / Fly.io (backend)

- **Railway**: deploy desde Git, PostgreSQL incluido.
- **Render**: similar, free tier con sleep.
- **Fly.io**: contenedores Docker globales, muy rápido.

| Necesito… | Plataforma |
| :--- | :--- |
| Solo HTML/CSS/JS | GitHub Pages / Netlify |
| Next.js / React | Vercel |
| Edge functions | Cloudflare Pages |
| Backend Node/Python | Railway / Render / Fly.io |
| Base de datos + API | Railway / Supabase / Neon |

---

## 🔁 CI/CD con GitHub Actions

**CI/CD** (Integración Continua / Despliegue Continuo) automatiza el proceso: cada `git push` compila, testea y despliega.

~~~yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
~~~

!!! tip "Un workflow por responsabilidad"
    Un workflow para **tests** (`ci.yml`), otro para **deploy** (`deploy.yml`). Así puedes ver de un vistazo qué falla: código o despliegue.

---

## 🔐 Variables de entorno y secretos

**Nunca** subas claves al repositorio. Usa variables de entorno:

~~~javascript
// ❌ Mal
const API_KEY = "sk-abc123...";

// ✅ Bien
const API_KEY = process.env.API_KEY;
~~~

### En GitHub Actions

1. Repo → Settings → Secrets and variables → Actions.
2. Añade `API_KEY` con su valor.
3. Úsalo en el workflow:

~~~yaml
- run: npm run build
  env:
    API_KEY: ${{ secrets.API_KEY }}
~~~

### En Vercel / Netlify

Se configuran en el panel web (Settings → Environment Variables). Se inyectan en build y en runtime.

!!! warning ".env nunca al repo"
    Añade `.env`, `.env.local`, `.env.*.local` a `.gitignore`. Si has subido uno por error, **rota las claves** inmediatamente: aunque borres el commit, quedan en el historial.

---

## 🌐 Dominio y HTTPS

### Dominio personalizado

1. Compra el dominio (Namecheap, Cloudflare Registrar, etc.).
2. En tu plataforma (Vercel/Netlify), añade el dominio.
3. Configura los registros DNS:
   - **A record** → IP del servidor (o `ALIAS`/`ANAME` en algunos proveedores).
   - **CNAME** → `www.tudominio.com` apuntando al host de la plataforma.

### HTTPS

Todas las plataformas modernas (Vercel, Netlify, Cloudflare, GitHub Pages) **emiten certificados Let's Encrypt automáticamente**. No tienes que hacer nada.

Si gestionas tu propio servidor:

~~~bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Emitir certificado
sudo certbot --nginx -d tudominio.com -d www.tudominio.com

# Renovación automática (cron)
sudo certbot renew --dry-run
~~~

!!! tip "HTTPS es obligatorio"
    Además de seguridad, **Google penaliza sitios sin HTTPS** en el ranking. Y los navegadores modernos los marcan como "No seguro".

---

## 📊 Monitorización básica

### ¿Qué medir?

| Métrica | Herramienta | Umbral |
| :--- | :--- | :--- |
| Uptime | UptimeRobot, BetterStack | >99.9% |
| Errores JS | Sentry | <0.1% sesiones |
| Rendimiento | Lighthouse, WebPageTest | LCP <2.5s |
| Tráfico | Google Analytics, Plausible | — |
| Logs | Plataforma (Vercel Logs, etc.) | — |

### Ejemplo con Sentry (errores en producción)

~~~javascript
import * as Sentry from "@sentry/browser";

Sentry.init({
    dsn: "https://...@sentry.io/...",
    tracesSampleRate: 0.1,
});
~~~

Captura automáticamente errores JS en el navegador y te avisa por email/Slack.

---

## 🔄 Rollback

Si un deploy rompe producción, necesitas **volver a la versión anterior** en segundos.

| Plataforma | Rollback |
| :--- | :--- |
| **Vercel** | Dashboard → Deployments → Promote anterior |
| **Netlify** | Deploys → Rollback to this deploy |
| **GitHub Pages** | `git revert` + push (rebuild) |
| **Cloudflare Pages** | Deployments → Rollback |
| **VPS** | Tag de Docker / `git checkout <tag>` |

!!! tip "Versiona con tags"
    Antes de cada deploy importante: `git tag v1.2.0 && git push --tags`. Si algo falla, `git checkout v1.2.0` y redeploy. Te salvará más de una vez.

---

## 🏗 Pipeline completo típico

~~~mermaid
graph LR
    A[git push] --> B[GitHub Actions]
    B --> C[npm test]
    C --> D[npm run build]
    D --> E[Deploy Vercel]
    E --> F[Preview URL]
    F --> G{¿OK?}
    G -->|Sí| H[Merge a main]
    G -->|No| I[Corregir]
    H --> J[Deploy producción]
~~~

1. Desarrollas en una rama.
2. `git push` → se dispara CI.
3. Si pasa, se genera una **preview URL**.
4. Revisas la preview.
5. Merge a `main` → deploy a producción.

---

## 🧪 Ejercicio práctico

!!! example "Desplegar un sitio estático en GitHub Pages"
    Despliega una web estática (HTML + CSS) en GitHub Pages usando GitHub Actions.

    **Pasos:**
    1. Crea un repo con `index.html` y `styles.css`.
    2. Crea `.github/workflows/deploy.yml` que:
       - Se dispare en push a `main`.
       - Use `actions/upload-pages-artifact` para subir la carpeta del sitio.
       - Use `actions/deploy-pages` para publicar.
    3. Activa GitHub Pages en Settings → Pages → Source: GitHub Actions.
    4. Push y verifica la URL `https://tu-usuario.github.io/tu-repo/`.

??? success "Solución"
    ~~~yaml
    name: Deploy Pages
    on:
      push:
        branches: [main]
    permissions:
      contents: read
      pages: write
      id-token: write
    jobs:
      deploy:
        runs-on: ubuntu-latest
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        steps:
          - uses: actions/checkout@v4
          - uses: actions/configure-pages@v5
          - uses: actions/upload-pages-artifact@v3
            with:
              path: "."
          - id: deployment
            uses: actions/deploy-pages@v4
    ~~~

    **Nota:** si tu sitio está en la raíz del repo, `path: "."`. Si está compilado en `dist/`, `path: "dist"`.

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué diferencia hay entre hosting estático y dinámico?"
    El estático solo sirve archivos (HTML, CSS, JS, imágenes). El dinámico ejecuta código en el servidor (Node, Python, etc.) y accede a bases de datos.

??? success "2. ¿Qué es CI/CD?"
    Integración Continua / Despliegue Continuo. CI: cada push compila y testea automáticamente. CD: si pasa, se despliega solo.

??? success "3. ¿Por qué no debes subir `.env` al repositorio?"
    Porque contiene secretos (API keys, contraseñas). En el historial de Git quedan para siempre. Usa variables de entorno en la plataforma y `.gitignore`.

??? success "4. ¿Cómo funciona el HTTPS automático en Vercel/Netlify?**
    La plataforma emite certificados Let's Encrypt automáticamente al añadir el dominio. No tienes que gestionar nada.

??? success "5. ¿Qué es un rollback y cuándo lo necesitas?"
    Volver a la versión anterior desplegada. Lo necesitas cuando un deploy rompe producción y no puedes arreglarlo en minutos.

---

## 📚 Recursos

- [GitHub Pages — Docs](https://docs.github.com/en/pages)
- [Vercel — Docs](https://vercel.com/docs)
- [Netlify — Docs](https://docs.netlify.com/)
- [Cloudflare Pages — Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions — Docs](https://docs.github.com/en/actions)
- [Let's Encrypt — Docs](https://letsencrypt.org/docs/)
- [web.dev — Deploy](https://web.dev/learn/pwa/deployment)

---

➡️ Siguiente capítulo: [10 — Proyecto final](10-proyecto-final.md)