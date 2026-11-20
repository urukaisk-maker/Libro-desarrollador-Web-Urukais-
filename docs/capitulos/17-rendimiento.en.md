---
description: "Chapter 17 of the Web Developer's Book: 17 — Web Performance. Learn step by step with examples, exercises, and quizzes."
---
# 17 — Web Performance

!!! abstract "What you will learn"
    - Why performance matters (business, UX, SEO).
    - Core Web Vitals: LCP, INP, CLS.
    - How to measure performance.
    - Optimizing images, fonts, CSS, and JS.
    - Advanced techniques: lazy loading, code splitting, critical CSS.

---

## ⚡ Why Does Performance Matter?

Web performance is not a technical luxury: it is **money**. A one-second delay can cut conversions by 7%. Google penalizes slow sites in search rankings.

!!! quote "Every millisecond counts"
    Amazon calculated that 100 ms of latency cost them 1% in sales. Performance is not optional.

---

## 📊 Core Web Vitals

Google measures three key metrics for SEO:

| Metric | What it measures | Target |
| :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | When the largest visible element loads | less than 2.5 s |
| **INP** (Interaction to Next Paint) | Interaction latency | less than 200 ms |
| **CLS** (Cumulative Layout Shift) | Unexpected layout shifts | less than 0.1 |

### How to Measure Them

```bash
# Lighthouse (Chrome DevTools)
F12 -> Lighthouse -> Analyze page load

# PageSpeed Insights
[https://pagespeed.web.dev/](https://pagespeed.web.dev/)
```

---

## 🖼 Image Optimization

Images make up **60% of the weight** of a typical website. Optimizing them has the biggest impact.

```html
<img
  src="foto-800.webp"
  srcset="foto-400.webp 400w, foto-800.webp 800w, foto-1600.webp 1600w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1600px"
  alt="Description"
  loading="lazy"
  decoding="async"
  width="800"
  height="600"
>
```

### Modern Formats

| Format | Advantage |
| :--- | :--- |
| **WebP** | 25-35% lighter than JPG/PNG |
| **AVIF** | 50% lighter than JPG, better quality |
| **SVG** | Vector-based, ideal for icons and logos |

!!! tip "Compression tools"
    - [Squoosh](https://squoosh.app/) — compress images in the browser.
    - [TinyPNG](https://tinypng.com/) — PNG/JPG compression.
    - [SVGOMG](https://jakearchibald.github.io/svgomg/) — optimize SVGs.

---

## 🔤 Font Optimization

```css
@font-face {
  font-family: "Inter";
  src: url("/fonts/inter.woff2") format("woff2");
  font-display: swap;
  font-weight: 100 900;
}
```

- **font-display: swap**: shows text with the fallback font while the custom font loads.
- **WOFF2**: lightest format, supported by all modern browsers.
- **Preload** the critical font with link rel=preload.

!!! warning "Every font weighs"
    Each custom font weighs between 20 and 200 KB. Limit the number of font families and weights to what is strictly necessary.

---

## 🎨 CSS Optimization

- **Minify** CSS in production.
- **Critical CSS**: inline critical CSS (above the fold) and load the rest with `loadCSS`.
- **Remove unused CSS**: tools like PurgeCSS.
- **Avoid `@import`** in CSS: it blocks loading in a waterfall.

```html
<link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="/styles.css"></noscript>
```

---

## ⚡ JavaScript Optimization

- **Minify and compress** (gzip/brotli).
- **Code splitting**: load only the JS needed for each page.
- **Tree shaking**: remove unused code.
- **Defer scripts**: `<script defer>` or `<script async>`.
- **Avoid huge libraries** for small tasks (moment.js → date-fns, lodash → lodash-es).

```html
<script src="/app.js" defer></script>
```

- **`defer`**: downloads in parallel and runs after HTML parsing (in order).
- **`async`**: downloads in parallel and runs as soon as ready (out of order).

---

## 🚀 Lazy Loading

Load resources **only when needed**, not beforehand.

```html
<!-- Images -->
<img src="foto.jpg" alt="Description" loading="lazy">

<!-- Iframes (videos, maps) -->
<iframe src="[https://youtube.com/embed/](https://youtube.com/embed/)..." loading="lazy"></iframe>

<!-- JS components -->
<script>
  document.getElementById("btn").addEventListener("click", async () => {
    const { abrirModal } = await import("./modal.js");
    abrirModal();
  });
</script>
```

---

## 🏎 Advanced Techniques

| Technique | What it does |
| :--- | :--- |
| **Preload** | Downloads a high-priority resource before it is needed |
| **Prefetch** | Downloads a resource likely needed for the next navigation |
| **Preconnect** | Opens a connection to an external domain before needing it |
| **Service Worker** | Caches resources for offline and instant loading |
| **CDN** | Serves assets from the server closest to the user |

```html
<link rel="preconnect" href="[https://fonts.googleapis.com](https://fonts.googleapis.com)">
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="prefetch" href="/proxima-pagina.html">
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-17">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What does LCP measure?</p>
<button class="quiz-option" data-opt="a">A) Layout shift</button>
<button class="quiz-option" data-opt="b">B) Load time of the largest visible element</button>
<button class="quiz-option" data-opt="c">C) Interaction latency</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which image format is lightest?</p>
<button class="quiz-option" data-opt="a">A) AVIF</button>
<button class="quiz-option" data-opt="b">B) PNG</button>
<button class="quiz-option" data-opt="c">C) BMP</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which attribute loads an image only when it approaches the viewport?</p>
<button class="quiz-option" data-opt="a">A) async</button>
<button class="quiz-option" data-opt="b">B) defer</button>
<button class="quiz-option" data-opt="c">C) loading="lazy"</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2017%3A%20Web%20Performance&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F17-rendimiento%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F17-rendimiento%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2017%3A%20Web%20Performance%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F17-rendimiento%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/17-rendimiento/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 18 — Arquitectura frontend](18-arquitectura.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }