# Capítulo 17 — Rendimiento web

## Introducción

El **rendimiento web** determina cuánto tarda tu página en cargar, en responder y en volverse interactiva. No es un detalle técnico: es **experiencia de usuario, conversión y SEO**.

Los estudios de Google y Amazon muestran que:

- Un segundo extra de carga puede reducir las conversiones un 7%.
- El 53% de los usuarios abandona si una página tarda más de 3 segundos.
- El rendimiento es un **factor de ranking** en Google.

## Core Web Vitals

Google define tres métricas principales (y una cuarta opcional) para medir la experiencia real del usuario.

| Métrica | Qué mide | Objetivo |
|---|---|---|
| **LCP** | Largest Contentful Paint — tiempo hasta que carga el elemento más grande | < 2.5 s |
| **INP** | Interaction to Next Paint — respuesta a la interacción | < 200 ms |
| **CLS** | Cumulative Layout Shift — saltos visuales | < 0.1 |
| **TTFB** | Time to First Byte — tiempo hasta el primer byte | < 800 ms |

### Cómo medirlas

- **Lighthouse** (DevTools → pestaña Lighthouse).
- **[PageSpeed Insights](https://pagespeed.web.dev/)**.
- **[Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/)**.
- **[CrUX](https://developers.google.com/web/tools/chrome-user-experience-report)** — datos reales de usuarios.

## Optimización de imágenes

Las imágenes suelen ser el **mayor peso** de una página.

### Formatos modernos

| Formato | Uso |
|---|---|
| **WebP** | Estándar moderno, buena compresión |
| **AVIF** | Mejor compresión aún, soporte creciente |
| **SVG** | Iconos, logos, ilustraciones vectoriales |
| **PNG** | Transparencias |
| **JPG** | Fotografías (legacy) |

```html
<picture>
  <source srcset="foto.avif" type="image/avif">
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Descripción" width="800" height="600" loading="lazy">
</picture>
```

### Atributos clave

- **`loading="lazy"`** — carga diferida para imágenes fuera de pantalla.
- **`width` y `height`** — evitan CLS reservando el espacio.
- **`srcset`** — sirve distintas resoluciones según el dispositivo.
- **`decoding="async"`** — no bloquea el renderizado.

```html
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="..."
  width="800"
  height="600"
  loading="lazy"
>
```

## Optimización de CSS

### CSS crítico inline

El CSS bloquea el renderizado. Para el **above-the-fold**, incrusta el CSS crítico en el `<head>`:

```html
<style>
  /* CSS mínimo para la primera pantalla */
  header { ... }
  .hero { ... }
</style>
<link rel="preload" href="/estilos.css" as="style" onload="this.rel='stylesheet'">
```

### Evita `@import` en CSS

`@import` bloquea en cascada. Usa múltiples `<link>` o un bundler.

### Minifica y comprime

- **Vite**, **PostCSS** o **cssnano** minifican automáticamente.
- Activa **gzip** o **Brotli** en el servidor.

## Optimización de JavaScript

### Reducir el bundle

- **Tree shaking** — elimina código no usado (Vite, Rollup).
- **Code splitting** — divide en chunks que se cargan bajo demanda.
- **Import dinámico**:

```javascript
button.addEventListener('click', async () => {
  const { abrirModal } = await import('./modal.js');
  abrirModal();
});
```

### `defer` y `async`

```html
<!-- Bloquea el HTML -->
<script src="app.js"></script>

<!-- Descarga en paralelo, ejecuta tras parsear el HTML -->
<script src="app.js" defer></script>

<!-- Descarga en paralelo, ejecuta al terminar la descarga -->
<script src="app.js" async></script>

<!-- Módulos: defer por defecto -->
<script type="module" src="app.js"></script>
```

**Regla**: usa `defer` casi siempre. `async` solo para scripts independientes (analytics, widgets).

### Cuidado con las librerías

Antes de instalar una dependencia:

- ¿Cuánto pesa? Consulta [Bundlephobia](https://bundlephobia.com/).
- ¿Puedo implementarlo yo en 20 líneas?
- ¿Tiene equivalente más ligero? (ej. `dayjs` en lugar de `moment`).

## Fuentes web

Las fuentes personalizadas son lentas. Estrategias:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="/fuentes/inter.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Inter';
  src: url('/fuentes/inter.woff2') format('woff2');
  font-display: swap; /* muestra texto con fuente fallback mientras carga */
  font-weight: 400;
  font-style: normal;
}
```

- **`font-display: swap`** — evita texto invisible (FOIT).
- **Subset** — carga solo los caracteres que usas.
- **Prefiere fuentes del sistema** cuando sea posible (`system-ui`).

## Caché y CDN

### Cache-Control

```http
Cache-Control: public, max-age=31536000, immutable
```

Para assets con hash (`app-a1b2c3.js`), caché de un año.

### CDN

Sirve assets desde la ubicación más cercana al usuario. **Cloudflare**, **Vercel**, **Netlify** lo hacen automáticamente.

## Compresión

- **Brotli** — mejor ratio que gzip.
- **gzip** — soporte universal.
- Configura el servidor para comprimir HTML, CSS, JS, SVG.

## HTTP/2 y HTTP/3

- **HTTP/2**: multiplexación, server push (obsoleto).
- **HTTP/3 (QUIC)**: menor latencia, mejores conexiones móviles.

La mayoría de CDN lo soportan sin configuración extra.

## Preload, prefetch y preconnect

```html
<!-- Recurso crítico: carga ya -->
<link rel="preload" href="/fuentes/inter.woff2" as="font" crossorigin>

<!-- Recurso para la siguiente navegación -->
<link rel="prefetch" href="/pagina-siguiente.html">

<!-- Conexión anticipada a un origen -->
<link rel="preconnect" href="https://api.ejemplo.com">

<!-- DNS anticipado (más ligero) -->
<link rel="dns-prefetch" href="https://analytics.ejemplo.com">
```

!!! warning "No abuses"
    Cada `preload` compite por ancho de banda. Úsalo solo para recursos **críticos** que descubrirías tarde.

## Evitar CLS (saltos visuales)

- **Siempre `width` y `height`** en `<img>` e `<iframe>`.
- Reserva espacio para anuncios y embeds.
- **`font-display: swap`** con fuentes similares.
- Evita insertar contenido sobre el que ya está visible.

```css
/* Reserva espacio antes de que cargue */
.video-wrapper {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

## Optimización de la primera carga

1. **Mide** con Lighthouse y PageSpeed Insights.
2. **Reduce el bundle inicial**. Carga solo lo necesario.
3. **Sirve CSS crítico** inline y el resto con `preload`.
4. **Carga JS con `defer`** o `type="module"`.
5. **Optimiza imágenes**: WebP/AVIF, `lazy`, `srcset`.
6. **Comprime con Brotli**.
7. **Activa caché** con `Cache-Control` largo para assets con hash.
8. **Usa CDN**.
9. **Mide en móvil**. Muchos usuarios lo hacen desde ahí.

## Herramientas

- **Lighthouse** (DevTools).
- **PageSpeed Insights**.
- **WebPageTest** — análisis detallado.
- **Bundlephobia** — tamaño de dependencias.
- **Bundle Analyzer** — Vite, Webpack.
- **Chrome Performance tab** — análisis fino del renderizado.
- **Chrome Coverage tab** — CSS/JS no usado.

## Ejemplo: de 4 s a 1.2 s

Checklist aplicada a un caso real:

- ❌ 3 imágenes de 2 MB → ✅ WebP + lazy + srcset → **300 KB totales**.
- ❌ jQuery + Bootstrap + Moment → ✅ Vanilla + 3 utilidades → **-180 KB**.
- ❌ CSS bloqueando el render → ✅ CSS crítico inline → **FCP -800 ms**.
- ❌ Fuentes Google sin `preconnect` → ✅ autoalojadas + `preload` → **-300 ms**.
- ❌ Sin compresión → ✅ Brotli en servidor → **-70% transferencia**.
- ❌ Sin caché → ✅ `Cache-Control` 1 año en assets → **0 ms en visitas repetidas**.

**Resultado**: LCP de 4.1 s → 1.2 s. Score Lighthouse de 42 → 98.

## Buenas prácticas

- **Mide antes de optimizar**. Sin datos, optimizas a ciegas.
- **Prioriza el móvil**. Es donde más duele.
- **Optimiza imágenes primero**. Es lo que más impacto tiene.
- **Menos JavaScript es más rápido**. Cada KB cuenta.
- **Carga bajo demanda** lo que no sea crítico.
- **Cachea todo lo posible**.
- **Automatiza la medición** en CI (Lighthouse CI).
- **Presupuesto de rendimiento**: fija límites (ej. < 200 KB de JS inicial).
- **Prueba en red lenta** (DevTools → Network → Slow 3G).

## Ejercicios

1. Mide tu portfolio con Lighthouse. Anota los tres Core Web Vitals.
2. Convierte tus imágenes JPG a WebP y añade `loading="lazy"`.
3. Añade `width` y `height` a todas las imágenes. Verifica CLS en Lighthouse.
4. Configura `font-display: swap` en tus fuentes.
5. Analiza el bundle con `vite-bundle-visualizer` y elimina una dependencia pesada.
6. Añade `preconnect` y `preload` para recursos críticos.
7. Configura compresión Brotli en tu hosting.
8. Ejecuta PageSpeed Insights en móvil y anota la mejora antes/después.

---

⬅️ [Capítulo 16 — Testing frontend](16-testing.md) | ➡️ [Capítulo 18 — Arquitectura frontend](18-arquitectura.md)
---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="c">
  <p class="quiz-question">¿Qué métrica mide el tiempo que tarda en cargar el elemento más grande de la página?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) FCP (First Contentful Paint)</button>
    <button class="quiz-option" data-option="b">B) CLS (Cumulative Layout Shift)</button>
    <button class="quiz-option" data-option="c">C) LCP (Largest Contentful Paint)</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué atributo HTML carga las imágenes solo cuando están a punto de aparecer en pantalla?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) async</button>
    <button class="quiz-option" data-option="b">B) loading="lazy"</button>
    <button class="quiz-option" data-option="c">C) defer</button>
  </div>
  <div class="quiz-feedback"></div>
</div>