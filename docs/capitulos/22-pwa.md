# Capítulo 22 — Progressive Web Apps (PWA)

## Introducción

Una **Progressive Web App (PWA)** es una aplicación web que se comporta como una app nativa: funciona offline, se instala en el dispositivo, envía notificaciones y se abre en su propia ventana sin la barra del navegador.

El objetivo es ofrecer la mejor experiencia posible a usuarios reales, incluso con conexiones lentas o inexistentes.

## ¿Qué hace que una web sea PWA?

Tres pilares:

1. **HTTPS obligatorio**.
2. **Service Worker** registrado.
3. **Manifest** válido.

Y una consecuencia: el navegador ofrece **instalarla** como app.

## Beneficios reales

- **Funciona sin conexión**.
- **Arranque instantáneo** tras la primera visita (gracias al caché).
- **Instalable** en móvil y escritorio.
- **Notificaciones push** (si las necesitas).
- **Sin tiendas de apps**: se distribuye por URL.
- **Multiplataforma** por defecto.

## Manifest: la carta de presentación

El **manifest** es un archivo JSON que describe la app.

```json
{
  "name": "Libro del Desarrollador Web",
  "short_name": "Libro Web",
  "description": "Material completo para aprender desarrollo web.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#6a5acd",
  "orientation": "portrait",
  "lang": "es",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

Enlázalo en el `<head>`:

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#6a5acd">
```

### `display` recomendado

| Valor | Comportamiento |
|---|---|
| `fullscreen` | Pantalla completa sin barras |
| `standalone` | Ventana propia sin barra de URL (recomendado) |
| `minimal-ui` | Ventana propia con navegación mínima |
| `browser` | Comportamiento de pestaña normal |

### Iconos

Genera iconos en varios tamaños (al menos 192 y 512). Puedes usar [Maskable.app](https://maskable.app/) para crear iconos adaptativos.

## Service Worker

El **Service Worker** es un script que corre en segundo plano, separado de la página. Intercepta peticiones y decide qué hacer: cachear, servir del caché, ir a la red…

### Registrar el Service Worker

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
</script>
```

### Service Worker básico

```javascript
// sw.js
const CACHE = 'mi-app-v1';
const RECURSOS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/favicon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(RECURSOS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((respuesta) => {
      return respuesta || fetch(event.request);
    })
  );
});
```

!!! warning "HTTPS obligatorio"
    Los Service Workers solo funcionan en HTTPS (o en `localhost` durante el desarrollo).

## Estrategias de caché

No hay una única forma de cachear. Hay varias según el tipo de recurso.

### Cache First

Busca en caché. Si no está, va a la red y guarda.

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});
```

**Úsala para**: assets estáticos (CSS, JS, imágenes).

### Network First

Intenta la red. Si falla, usa el caché.

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, clone));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
```

**Úsala para**: HTML, APIs que cambian frecuentemente.

### Stale While Revalidate

Sirve del caché **y** actualiza en segundo plano.

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(event.request);
      const network = fetch(event.request).then((res) => {
        cache.put(event.request, res.clone());
        return res;
      });
      return cached || network;
    })
  );
});
```

**Úsala para**: contenido que puede estar ligeramente desactualizado (avatares, listas).

### Cache solo si es exitoso

```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res.ok && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
```

## Workbox: la forma profesional

Mantener un Service Worker a mano se vuelve complicado. **Workbox** (de Google) simplifica todo.

```bash
npm install -D workbox-build workbox-window
```

```javascript
// sw.js
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precarga todos los assets generados por el build
precacheAndRoute(self.__WB_MANIFEST);

// Imágenes
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'imagenes',
    plugins: [
      new ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }),
    ],
  })
);

// HTML
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({ cacheName: 'paginas' })
);

// APIs
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({ cacheName: 'api' })
);
```

### Con Vite

```bash
npm install -D vite-plugin-pwa
```

`vite.config.js`:

```javascript
import { VitePWA } from 'vite-plugin-pwa';

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Mi App',
        short_name: 'App',
        theme_color: '#6a5acd',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
};
```

Con esto ya tienes PWA funcional sin escribir el Service Worker a mano.

## Instalación en el dispositivo

### El evento `beforeinstallprompt`

Chrome/Edge ofrecen un banner propio, pero puedes personalizarlo:

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  mostrarBotonInstalar();
});

async function instalar() {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('Resultado:', outcome); // 'accepted' o 'dismissed'
  deferredPrompt = null;
}
```

### Botón de instalación

```html
<button id="btn-instalar" hidden>Instalar app</button>
<script>
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    window.deferredPrompt = e;
    document.getElementById('btn-instalar').hidden = false;
  });

  document.getElementById('btn-instalar').addEventListener('click', async () => {
    if (!window.deferredPrompt) return;
    window.deferredPrompt.prompt();
    await window.deferredPrompt.userChoice;
    window.deferredPrompt = null;
    document.getElementById('btn-instalar').hidden = true;
  });
</script>
```

!!! info "iOS es diferente"
    Safari en iOS **no soporta** `beforeinstallprompt`. El usuario debe pulsar "Compartir" → "Añadir a pantalla de inicio". Detecta iOS y muestra instrucciones manuales.

## Página offline personalizada

```javascript
// sw.js
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  }
});
```

Precarga `/offline.html` en el install.

## Notificaciones push

Requieren permiso del usuario y un servidor que las envíe (con las **Push API** y **VAPID**).

```javascript
const permiso = await Notification.requestPermission();
if (permiso === 'granted') {
  const registro = await navigator.serviceWorker.ready;
  const suscripcion = await registro.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'tu-clave-publica-vapid',
  });
  // Envía 'suscripcion' a tu backend
}
```

!!! warning "No abuses"
    Las notificaciones push deben ser útiles. Si molestas al usuario, desinstalará la PWA.

## Sincronización en segundo plano

Permite enviar datos cuando vuelve la conexión.

```javascript
// En la página
await navigator.serviceWorker.ready;
await registration.sync.register('enviar-pendientes');

// En el sw.js
self.addEventListener('sync', (event) => {
  if (event.tag === 'enviar-pendientes') {
    event.waitUntil(enviarPendientes());
  }
});
```

## Testing de PWA

- **Lighthouse** → pestaña *Progressive Web App*.
- **Chrome DevTools** → Application → Service Workers.
- **Application → Manifest** para revisar el manifest.
- **Application → Cache Storage** para ver qué hay cacheado.

Chrome también tiene un modo "Offline" en DevTools (Network → Offline) para probar sin conexión.

## Ejemplo: convertir tu portfolio en PWA

Checklist:

- [ ] Crear `manifest.json` con iconos.
- [ ] Registrar un Service Worker.
- [ ] Cachear assets estáticos.
- [ ] Añadir página offline.
- [ ] Probar con Lighthouse (score > 90).
- [ ] Probar en móvil real.
- [ ] Añadir botón "Instalar".

## Buenas prácticas

- **HTTPS siempre**. Sin esto no hay PWA.
- **No caches todo**. Elige estrategia por recurso.
- **Versiona el caché** (`mi-app-v1`, `mi-app-v2`).
- **Borra cachés antiguos** en el `activate`.
- **Actualiza con cuidado**. Un Service Worker mal actualizado puede dejar la app rota.
- **Prueba en móvil real**. No todo lo que funciona en DevTools funciona en un dispositivo.
- **Página offline útil**. No un error genérico.
- **No bloquees la primera visita**. La app debe funcionar aunque el SW falle.
- **Usa Workbox** para no reinventar la rueda.

## Ejercicios

1. Añade un `manifest.json` a tu portfolio con iconos de 192 y 512.
2. Registra un Service Worker y verifica con DevTools.
3. Cachea assets estáticos con estrategia Cache First.
4. Añade una página offline personalizada.
5. Configura `vite-plugin-pwa` si usas Vite.
6. Añade un botón "Instalar app" con `beforeinstallprompt`.
7. Pasa Lighthouse PWA con score > 90.
8. Prueba la app en modo avión desde el móvil.

---

⬅️ [Capítulo 21 — Web Components](21-web-components.md) | ➡️ [Capítulo 23 — WebSockets](23-websockets.md)
