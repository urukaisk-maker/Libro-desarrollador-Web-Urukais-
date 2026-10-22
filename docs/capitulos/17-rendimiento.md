# 17 — Rendimiento web

!!! abstract "Qué vas a aprender"
    - Por qué el rendimiento importa (negocio, UX, SEO).
    - Core Web Vitals: LCP, INP, CLS.
    - Cómo medir el rendimiento.
    - Optimización de imágenes, fuentes, CSS y JS.
    - Técnicas avanzadas: lazy loading, code splitting, critical CSS.

---

## ⚡ ¿Por qué importa el rendimiento?

El rendimiento web no es un lujo técnico: es **dinero**. Un segundo de retraso puede reducir las conversiones un 7%. Google penaliza los sitios lentos en el ranking.

!!! quote "Cada milisegundo cuenta"
    Amazon calculó que 100 ms de latencia le costaban un 1% en ventas. El rendimiento no es opcional.

---

## 📊 Core Web Vitals

Google mide tres métricas clave para el SEO:

| Métrica | Qué mide | Objetivo |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | Cuándo se carga el elemento más grande visible | < 2.5 s |
| **INP** (Interaction to Next Paint) | Latencia de las interacciones | < 200 ms |
| **CLS** (Cumulative Layout Shift) | Cambios de layout inesperados | < 0.1 |

### Cómo medirlos

```bash
# Lighthouse (Chrome DevTools)
F12 -> Lighthouse -> Analyze page load

# PageSpeed Insights
https://pagespeed.web.dev/
```

---

## 🖼️ Optimización de imágenes

Las imágenes son el **60% del peso** de una web típica. Optimizarlas es lo que más impacto tiene.

```html
<img
  src="foto-800.webp"
  srcset="foto-400.webp 400w, foto-800.webp 800w, foto-1600.webp 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Descripción"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
>
```

### Formatos modernos

| Formato | Ventaja |
| :--- | :--- |
| **WebP** | 25-35% más ligero que JPG/PNG |
| **AVIF** | 50% más ligero que JPG, mejor calidad |
| **SVG** | Vectorial, ideal para iconos y logos |

!!! tip "Herramientas de compresión"
    - [Squoosh](https://squoosh.app/) — comprime imágenes en el navegador.
    - [TinyPNG](https://tinypng.com/) — compresión PNG/JPG.
    - [SVGOMG](https://jakearchibald.github.io/svgomg/) — optimiza SVG.

---

## 🔤 Optimización de fuentes

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap;
  font-weight: 100 900;
}
```

- **font-display: swap**: muestra el texto con la fuente de respaldo mientras carga la custom.
- **WOFF2**: formato más ligero, soportado por todos los navegadores modernos.
- **Precarga** la fuente crítica con link rel=preload.

!!! warning "Cada fuente pesa"
    Cada tipografía custom pesa entre 20 y 200 KB. Limita el número de familias y pesos a los estrictamente necesarios.

---

## 🎨 Optimización de CSS

- **Minifica** el CSS en producción.
- **Critical CSS**: inlinea el CSS crítico (el que se ve en el primer renderizado) y carga el resto con `loadCSS`.
- **Elimina CSS no usado**: herramientas como PurgeCSS.
- **Evita `@import`** en CSS: bloquea la carga en cascada.

```html
<link rel="stylesheet" href="/styles.css" media="print" onload="this.media=\x27all\x27">
<noscript><link rel="stylesheet" href="/styles.css"></noscript>
```

---

## ⚡ Optimización de JavaScript

- **Minifica y comprime** (gzip/brotli).
- **Code splitting**: carga solo el JS necesario para cada página.
- **Tree shaking**: elimina código no usado.
- **Diferir scripts**: `<script defer>` o `<script async>`.
- **Evita librerías enormes** para cosas pequeñas (moment.js → date-fns, lodash → lodash-es).

```html
<script src="/app.js" defer></script>
```

- **`defer`**: descarga en paralelo y ejecuta después de parsear el HTML (en orden).
- **`async`**: descarga en paralelo y ejecuta en cuanto esté listo (sin orden).

---

## 🚀 Lazy loading

Carga recursos **solo cuando se necesitan**, no antes.

```html
<!-- Imágenes -->
<img src="foto.jpg" alt="Descripción" loading="lazy">

<!-- Iframes (vídeos, mapas) -->
<iframe src="https://youtube.com/embed/..." loading="lazy"></iframe>

<!-- Componentes JS -->
<script>
  document.getElementById("btn").addEventListener("click", async () => {
    const { abrirModal } = await import("./modal.js");
    abrirModal();
  });
</script>
```

---

## 🏎️ Técnicas avanzadas

| Técnica | Qué hace |
| :--- | :--- |
| **Preload** | Descarga un recurso prioritario antes de que se necesite |
| **Prefetch** | Descarga un recurso probable para la próxima navegación |
| **Preconnect** | Abre conexión con un dominio externo antes de necesitarlo |
| **Service Worker** | Cachea recursos para carga offline e instantánea |
| **CDN** | Sirve assets desde el servidor más cercano al usuario |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="prefetch" href="/proxima-pagina.html">
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-17">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué mide LCP?</p>
<button class="quiz-option" data-opt="a">A) El cambio de layout</button>
<button class="quiz-option" data-opt="b">B) El tiempo de carga del elemento más grande visible</button>
<button class="quiz-option" data-opt="c">C) La latencia de las interacciones</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué formato de imagen es más ligero?</p>
<button class="quiz-option" data-opt="a">A) AVIF</button>
<button class="quiz-option" data-opt="b">B) PNG</button>
<button class="quiz-option" data-opt="c">C) BMP</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué atributo carga una imagen solo cuando se acerca al viewport?</p>
<button class="quiz-option" data-opt="a">A) async</button>
<button class="quiz-option" data-opt="b">B) defer</button>
<button class="quiz-option" data-opt="c">C) loading="lazy"</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2017%3A%20Rendimiento%20web&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F17-rendimiento%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F17-rendimiento%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2017%3A%20Rendimiento%20web%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F17-rendimiento%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/17-rendimiento/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 18 — Arquitectura frontend](18-arquitectura.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
