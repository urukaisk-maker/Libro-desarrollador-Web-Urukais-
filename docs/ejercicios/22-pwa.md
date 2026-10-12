# Ejercicios resueltos — Capítulo 22

[Volver al índice](index.md) · [Capítulo original](../capitulos/22-pwa.md)

## Ejercicio 1: Manifest

> Añade un `manifest.json` a tu portfolio con iconos de 192 y 512.

### Solución

```json
{
  "name": "Mi Portfolio",
  "short_name": "Portfolio",
  "description": "Portfolio personal de Urukais",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#6a5acd",
  "lang": "es",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ]
}
```

En el `<head>` del HTML:

```html
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#6a5acd">
```

---

## Ejercicio 2: Service Worker básico

> Registra un Service Worker y verifica con DevTools.

### Solución

`index.html`:

```html
<script>
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
</script>
```

`sw.js`:

```javascript
const CACHE = 'mi-app-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.addAll([
      '/',
      '/index.html',
      '/styles.css',
      '/app.js',
    ]))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
```

**Verificar:** DevTools → Application → Service Workers.

---

## Ejercicio 3: Cache First para assets

> Cachea assets estáticos con estrategia Cache First.

### Solución

```javascript
const CACHE = 'assets-v1';

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Solo assets estáticos
  if (request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;

        return fetch(request).then(res => {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(request, clone));
          return res;
        });
      })
    );
  }
});
```

---

## Ejercicio 4: Página offline

> Añade una página offline personalizada.

### Solución

`offline.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Sin conexión</title>
  <style>
    body {
      font-family: system-ui, sans-serif;
      display: grid;
      place-items: center;
      min-height: 100vh;
      margin: 0;
      background: #0f172a;
      color: #e2e8f0;
      text-align: center;
      padding: 2rem;
    }
    h1 { color: #a78bfa; }
  </style>
</head>
<body>
  <div>
    <h1>📡 Sin conexión</h1>
    <p>Parece que no tienes internet. Vuelve a intentarlo cuando recuperes la conexión.</p>
    <button onclick="location.reload()">Reintentar</button>
  </div>
</body>
</html>
```

En `sw.js`:

```javascript
const CACHE = 'offline-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(c => c.add('/offline.html'))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline.html'))
    );
  }
});
```

---

## Ejercicio 5: `vite-plugin-pwa`

> Configura `vite-plugin-pwa` si usas Vite.

### Solución

```bash
npm install -D vite-plugin-pwa
```

`vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
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
});
```

Listo. Ya tienes PWA sin escribir el Service Worker.

---

## Ejercicio 6: Botón "Instalar app"

> Añade un botón con `beforeinstallprompt`.

### Solución

```html
<button id="btn-instalar" hidden>Instalar app</button>

<script>
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('btn-instalar').hidden = false;
  });

  document.getElementById('btn-instalar').addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log('Resultado:', outcome);
    deferredPrompt = null;
    document.getElementById('btn-instalar').hidden = true;
  });
</script>
```

!!! info "iOS es diferente"
    Safari iOS no soporta `beforeinstallprompt`. Hay que mostrar instrucciones: "Compartir → Añadir a pantalla de inicio".

---

## Ejercicio 7: Lighthouse PWA

> Pasa Lighthouse PWA con score > 90.

### Solución

**Checklist:**

- [ ] HTTPS activo.
- [ ] Manifest con iconos de 192 y 512.
- [ ] `theme_color` y `background_color` definidos.
- [ ] Service Worker registrado y controlando la página.
- [ ] `start_url` responde 200.
- [ ] Funciona offline en la página principal.

**Verificar:**

DevTools → Lighthouse → **Progressive Web App** → Analyze.

---

## Ejercicio 8: Probar en modo avión

> Prueba la app en modo avión desde el móvil.

### Solución

1. Abre la web en el móvil.
2. Navega un poco (para que se cachee).
3. Activa **modo avión**.
4. Vuelve a la app (desde el icono si la instalaste).
5. Comprueba que:
   - Carga la home.
   - Navegas entre páginas ya visitadas.
   - Si no hay página cacheada, aparece tu `offline.html`.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/22-pwa.md)
