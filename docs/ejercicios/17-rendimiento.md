# Ejercicios resueltos — Capítulo 17

[Volver al índice](index.md) · [Capítulo original](../capitulos/17-rendimiento.md)

## Ejercicio 1: Medir con Lighthouse

> Mide tu portfolio con Lighthouse.

### Solución

1. Abre DevTools (`F12`).
2. Pestaña **Lighthouse**.
3. Marca **Performance**, **Accessibility**, **Best Practices**, **SEO**.
4. Elige **Mobile** (más realista).
5. **Analyze page load**.

Anota:
- **FCP** (First Contentful Paint)
- **LCP** (Largest Contentful Paint)
- **CLS** (Cumulative Layout Shift)
- **TBT** (Total Blocking Time)

---

## Ejercicio 2: Imágenes en WebP

> Convierte tus imágenes a WebP y añade `loading="lazy"`.

### Solución

**Conversión (con `cwebp`):**

```bash
cwebp foto.jpg -q 80 -o foto.webp
```

**HTML con fallback:**

```html
<picture>
  <source srcset="foto.webp" type="image/webp">
  <img src="foto.jpg" alt="Descripción" width="800" height="600" loading="lazy">
</picture>
```

**Sin convertir, con `srcset` responsive:**

```html
<img
  src="foto-800.jpg"
  srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Descripción"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
>
```

---

## Ejercicio 3: `width` y `height` en imágenes

> Añade dimensiones a todas las imágenes para evitar CLS.

### Solución

```html
<!-- ❌ Mal: el navegador no reserva espacio -->
<img src="foto.jpg" alt="...">

<!-- ✅ Bien: el navegador reserva espacio y evita el salto -->
<img src="foto.jpg" alt="..." width="800" height="600">

<!-- Alternativa con CSS aspect-ratio -->
<style>
  .video {
    aspect-ratio: 16 / 9;
    width: 100%;
  }
</style>
<iframe class="video" src="..."></iframe>
```

---

## Ejercicio 4: `font-display: swap`

> Configura `font-display: swap` en tus fuentes.

### Solución

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

O con Google Fonts:

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
  rel="stylesheet"
>
```

**`display=swap`** → muestra texto con fuente fallback mientras carga la real.

---

## Ejercicio 5: Analizar el bundle

> Analiza el bundle con `vite-bundle-visualizer`.

### Solución

```bash
npm install -D vite-bundle-visualizer
```

Añade a `package.json`:

```json
{
  "scripts": {
    "analyze": "vite-bundle-visualizer"
  }
}
```

Ejecuta:

```bash
npm run analyze
```

Se abre un gráfico con el tamaño de cada dependencia. Identifica las más pesadas y busca alternativas más ligeras:

| Paquete pesado | Alternativa ligera |
|---|---|
| `moment` (~70 KB) | `dayjs` (~2 KB) |
| `lodash` (~70 KB) | `lodash-es` con tree shaking |
| `axios` (~50 KB) | `fetch` nativo |
| `jQuery` (~90 KB) | DOM nativo |

---

## Ejercicio 6: `preconnect` y `preload`

> Añade `preconnect` y `preload` para recursos críticos.

### Solución

```html
<head>
  <!-- Anticipa la conexión con la CDN de fuentes -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Precarga la fuente principal (usa las que aparecen en el primer render) -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

  <!-- Precarga el CSS crítico -->
  <link rel="preload" href="/estilos.css" as="style">

  <!-- DNS prefetch para servicios externos -->
  <link rel="dns-prefetch" href="https://analytics.ejemplo.com">
</head>
```

!!! warning "No abuses del preload"
    Cada `preload` compite por ancho de banda. Úsalo solo para recursos **críticos** que descubrirías tarde.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/17-rendimiento.md)
