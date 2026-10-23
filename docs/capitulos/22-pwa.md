# 22 — Progressive Web Apps (PWA)

!!! abstract "Qué vas a aprender"
    - Qué es una PWA y por qué es el futuro de la web.
    - El manifest: instalable en el móvil.
    - Service Workers: offline y caché.
    - Notificaciones push.
    - Auditoría con Lighthouse.

---

## 📱 ¿Qué es una PWA?

Una **PWA** (*Progressive Web App*) es una web que se comporta como una app nativa: se puede **instalar**, funciona **offline** y envía **notificaciones push**. Todo con HTML, CSS y JavaScript.

```
Web normal + manifest + service worker = PWA
```

!!! quote "Las PWA son el futuro de la web"
    Twitter, Spotify, Pinterest, Starbucks... todas tienen PWA. Y funcionan igual de bien (o mejor) que sus apps nativas, sin pasar por las stores.

---

## 📄 El manifest

El **manifest** es un archivo JSON que le dice al navegador cómo instalar la app.

```json
// manifest.json
{
  "name": "Mi App",
  "short_name": "MiApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#6a5acd",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

```html
&lt;link rel="manifest" href="/manifest.json"&gt;
&lt;meta name="theme-color" content="#6a5acd"&gt;
```

### Propiedades clave

| Propiedad | Qué hace |
| :--- | :--- |
| `name` | Nombre completo de la app |
| `short_name` | Nombre corto (para el icono) |
| `start_url` | URL de inicio al abrir |
| `display` | `standalone`, `fullscreen`, `minimal-ui`, `browser` |
| `theme_color` | Color de la barra de estado |
| `icons` | Iconos en varios tamaños |

---

## ⚙️ El Service Worker

El **Service Worker** es un script que se ejecuta en segundo plano y actúa como proxy entre la app y la red. Permite cachear recursos y servir la app offline.

```javascript
// sw.js
const CACHE = "mi-app-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/icon-192.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    })
  );
});
```

### Registrar el Service Worker

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then((reg) => console.log("SW registrado", reg))
    .catch((err) => console.error("Error", err));
}
```

!!! tip "Solo en producción"
    Los Service Workers requieren HTTPS (o localhost). Asegúrate de que tu sitio usa HTTPS antes de registrarlo.

---

## 🔄 Estrategias de caché

| Estrategia | Qué hace |
| :--- | :--- |
| **Cache first** | Mira en caché primero, si no, va a la red |
| **Network first** | Va a la red primero, si falla, mira en caché |
| **Stale while revalidate** | Devuelve caché y actualiza en segundo plano |
| **Cache only** | Solo caché (offline total) |
| **Network only** | Solo red (sin caché) |

```javascript
// Network first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
```

---

## 🔔 Notificaciones push

```javascript
// Pedir permiso
const permiso = await Notification.requestPermission();
if (permiso === "granted") {
  new Notification("¡Hola!", {
    body: "Bienvenido a Mi App",
    icon: "/icon-192.png"
  });
}
```

### Push desde el servidor

```javascript
// En el service worker
self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon-192.png"
  });
});
```

!!! warning "No pidas permiso al cargar"
    Pide permiso de notificaciones **después** de que el usuario haga algo significativo (comprar, registrarse, etc.). Si lo pides al cargar, la mayoría denegará.

---

## 🔍 Auditoría con Lighthouse

```bash
# En Chrome DevTools
F12 -> Lighthouse -> Analizar
# Categorías a comprobar: PWA, Performance, Accessibility
```

| Requisito PWA | Cómo cumplirlo |
| :--- | :--- |
| HTTPS | Certificado SSL (Let\x27s Encrypt gratis) |
| Manifest | Archivo manifest.json enlazado |
| Service Worker | Registrado y con caché |
| Iconos | 192x192 y 512x512 |
| start_url | Definida en el manifest |

---

## ✅ Buenas prácticas

- ✅ **HTTPS obligatorio**: sin él no hay PWA.
- ✅ **Cachea solo lo necesario**: no infles el caché.
- ✅ **Actualiza el caché** al desplegar nueva versión.
- ✅ **Pide permiso de notificaciones con contexto**.
- ✅ **Prueba offline**: desconecta la red y comprueba que funciona.
- ✅ **Usa Workbox** si el proyecto es grande.
- ❌ **No cachees el HTML para siempre**: los usuarios no verán actualizaciones.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-22">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué archivo define cómo se instala una PWA?</p>
<button class="quiz-option" data-opt="a">A) service-worker.js</button>
<button class="quiz-option" data-opt="b">B) manifest.json</button>
<button class="quiz-option" data-opt="c">C) index.html</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué permite que una PWA funcione offline?</p>
<button class="quiz-option" data-opt="a">A) El Service Worker</button>
<button class="quiz-option" data-opt="b">B) El manifest</button>
<button class="quiz-option" data-opt="c">C) El HTML</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué estrategia devuelve caché y actualiza en segundo plano?</p>
<button class="quiz-option" data-opt="a">A) Cache first</button>
<button class="quiz-option" data-opt="b">B) Network first</button>
<button class="quiz-option" data-opt="c">C) Stale while revalidate</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2022%3A%20PWA&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F22-pwa%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F22-pwa%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2022%3A%20PWA%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F22-pwa%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/22-pwa/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 23 — WebSockets y tiempo real](23-websockets.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
