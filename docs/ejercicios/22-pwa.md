# 22 — PWA

!!! quote "Ejercicio resuelto"
    Crea un manifest y un service worker básico.

---

## 🎯 Objetivo

1. Crea un \`manifest.json\` con nombre, iconos y color.
2. Crea un \`sw.js\` que cachee el HTML y CSS.
3. Registra el SW en \`index.html\`.

---

## 💡 Solución

\`\`\`json
// manifest.json
{
  "name": "Mi PWA",
  "short_name": "MiPWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6a5acd",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
\`\`\`

\`\`\`javascript
// sw.js
const CACHE = 'mi-pwa-v1';
const ASSETS = ['/', '/index.html', '/styles.css'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
\`\`\`

\`\`\`html
<link rel="manifest" href="/manifest.json">
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
</script>
\`\`\`

---

## 🧠 Conceptos clave

- \`manifest.json\`: define cómo se instala la PWA.
- \`service worker\`: intercepta peticiones y cachea.
- HTTPS obligatorio (o localhost).

---

## 🚀 Retos extra

- [ ] Añade estrategia network-first.
- [ ] Añade un botón de "Añadir a pantalla de inicio".
- [ ] Comprueba con Lighthouse que es instalable.

---

[← Ejercicio 21](21-web-components.md){ .md-button }
[Ir al ejercicio 23 →](23-websockets.md){ .md-button .md-button--primary }
