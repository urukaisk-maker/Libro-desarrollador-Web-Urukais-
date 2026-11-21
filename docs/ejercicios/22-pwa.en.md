---
description: "Solved exercise 22: 22 — PWA. Step-by-step annotated solution from the Web Developer Book."
---
# 22 — PWA

!!! quote "Solved exercise"
    Create a manifest and a basic service worker.

---

## 🎯 Goal

1. Create a `manifest.json` with name, icons, and color.
2. Create a `sw.js` that caches HTML and CSS.
3. Register the SW in `index.html`.

---

## 💡 Solution

```json
// manifest.json
{
  "name": "My PWA",
  "short_name": "MyPWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6a5acd",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

```javascript
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
```

```html
<link rel="manifest" href="/manifest.json">
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
</script>
```

---

## 🧠 Key concepts

- `manifest.json`: defines how the PWA is installed.
- `service worker`: intercepts requests and caches assets.
- HTTPS required (or localhost).

---

## 🚀 Bonus challenges

- [ ] Add a network-first strategy.
- [ ] Add an "Add to home screen" button.
- [ ] Verify installability with Lighthouse.

---

[← Exercise 21](21-web-components.md){ .md-button }
[Go to exercise 23 →](23-websockets.md){ .md-button .md-button--primary }
