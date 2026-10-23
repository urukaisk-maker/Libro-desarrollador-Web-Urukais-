# 09 — Despliegue y hosting

!!! abstract "Qué vas a aprender"
    - Qué significa desplegar una web.
    - Las opciones de hosting más usadas.
    - Cómo desplegar en Netlify, Vercel y GitHub Pages.
    - Dominios y DNS.
    - Buenas prácticas antes de publicar.

---

## 🚀 ¿Qué es desplegar?

**Desplegar** (o *deployar*) es publicar tu web en internet para que cualquiera pueda acceder a ella. Hasta que no despliegas, tu web solo existe en tu ordenador.

!!! quote "Tu web no existe hasta que está online"
    Puedes tener el código más bonito del mundo, pero si no lo despliegas, nadie puede verlo. El despliegue es el paso final de cualquier proyecto.

---

## 🏠 Opciones de hosting

| Plataforma | Precio | Ideal para |
| :--- | :--- | :--- |
| **GitHub Pages** | Gratis | Sitios estáticos, portfolios, documentación |
| **Netlify** | Gratis (hasta cierto límite) | Sitios estáticos, funciones serverless |
| **Vercel** | Gratis (hasta cierto límite) | Frontend moderno, Next.js |
| **Cloudflare Pages** | Gratis | CDN global, sitios estáticos |
| **Render** | Gratis limitado | Full-stack, bases de datos |
| **Railway** | De pago (prueba gratis) | Full-stack, bases de datos |

!!! tip "Empieza por GitHub Pages"
    Si tu web es estática (HTML, CSS, JS sin backend), GitHub Pages es la opción más sencilla: subes el código a GitHub y se publica solo.

---

## 🐙 Desplegar en GitHub Pages

### 1. Sube tu proyecto a GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### 2. Activa GitHub Pages

1. Ve a **Settings** → **Pages** en tu repositorio.
2. En **Source**, selecciona **Deploy from a branch**.
3. Elige la rama \`main\` y la carpeta \`/ (root)\` (o \`/docs\` si tu web está en \`docs/\`).
4. Pulsa **Save**.

En unos segundos, tu web estará en \`https://tu-usuario.github.io/tu-repo/\`.

!!! tip "Dominio personalizado"
    En la misma página de **Pages**, puedes añadir un dominio personalizado (ej. \`tudominio.com\`) y configurar los DNS en tu proveedor.

---

## 🟢 Desplegar en Netlify

1. Crea una cuenta en [netlify.com](https://www.netlify.com/).
2. Conecta tu repositorio de GitHub.
3. Netlify detecta el framework automáticamente.
4. Pulsa **Deploy site**.

Cada vez que hagas \`push\` a \`main\`, Netlify redespliega automáticamente.

!!! tip "Preview deployments"
    Netlify genera una URL de preview para cada Pull Request. Perfecto para revisar cambios antes de fusionar.

---

## ⚡ Desplegar en Vercel

1. Crea una cuenta en [vercel.com](https://vercel.com/).
2. Importa tu repositorio de GitHub.
3. Vercel detecta el framework automáticamente.
4. Pulsa **Deploy**.

Igual que Netlify, cada \`push\` a \`main\` redespliega. También genera previews por PR.

---

## 🌐 Dominios y DNS

Un **dominio** (ej. \`misitio.com\`) es la dirección de tu web. Para usarlo con tu hosting:

1. **Compra el dominio** en un registrador (Namecheap, Cloudflare, Donweb…).
2. **Configura los DNS** para que apunten al hosting:
   - **Registro A**: apunta a la IP del hosting.
   - **Registro CNAME**: apunta a un subdominio del hosting (ej. \`tu-sitio.netlify.app\`).
3. **Espera la propagación** (puede tardar hasta 24 h, aunque suele ser minutos).
4. **Configura HTTPS**: la mayoría de hostings lo hacen automático (Let's Encrypt).

!!! warning "HTTPS no es opcional"
    Google penaliza los sitios sin HTTPS. Todos los hostings modernos ofrecen HTTPS gratis con Let's Encrypt. Actívalo siempre.

---

## ✅ Antes de desplegar: checklist

- [ ] **HTTPS activado** (candado en la barra del navegador).
- [ ] **Responsive** comprobado en móvil, tablet y escritorio.
- [ ] **Enlaces internos** funcionan (no hay 404).
- [ ] **Imágenes optimizadas** (WebP/AVIF, \`loading="lazy"\`).
- [ ] **Metadatos SEO** (title, description, Open Graph).
- [ ] **Favicon** configurado.
- [ ] **Analytics** (opcional, pero recomendado).
- [ ] **Cookies** (banner si usas analíticas).
- [ ] **Formularios** probados (que envíen de verdad).
- [ ] **Consola del navegador** sin errores.

---

## 🔄 CI/CD: despliegue automático

**CI/CD** (*Continuous Integration / Continuous Deployment*) es la práctica de automatizar el despliegue cada vez que haces \`push\`.

### GitHub Actions

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
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Este workflow se ejecuta en cada \`push\` a \`main\`, construye el proyecto y lo publica en GitHub Pages.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-9">
<div class="quiz-question" data-answer="a">
<p><strong>1.</strong> ¿Qué es desplegar una web?</p>
<button class="quiz-option" data-opt="a">A) Publicarla en internet para que cualquiera acceda</button>
<button class="quiz-option" data-opt="b">B) Guardarla en tu ordenador</button>
<button class="quiz-option" data-opt="c">C) Hacerle una copia de seguridad</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> ¿Qué hosting es gratuito para sitios estáticos?</p>
<button class="quiz-option" data-opt="a">A) AWS</button>
<button class="quiz-option" data-opt="b">B) DigitalOcean</button>
<button class="quiz-option" data-opt="c">C) GitHub Pages</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>3.</strong> ¿Qué significa CI/CD?</p>
<button class="quiz-option" data-opt="a">A) Code Inspector / Code Debugger</button>
<button class="quiz-option" data-opt="b">B) Continuous Integration / Continuous Deployment</button>
<button class="quiz-option" data-opt="c">C) Cloud Infrastructure / Cloud Data</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%209%3A%20Despliegue%20y%20hosting&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F09-despliegue%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F09-despliegue%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%209%3A%20Despliegue%20y%20hosting%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F09-despliegue%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/09-despliegue/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 10 — Proyecto final: portfolio](10-proyecto-final.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
