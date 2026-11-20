---
description: "Chapter 22 of the Web Developer's Book: 22 — Progressive Web Apps (PWA). Learn step by step with examples, exercises, and quizzes."
---
# 22 — Progressive Web Apps (PWA)

!!! abstract "What you will learn"
    - What a PWA is and why it is the future of the web.
    - The manifest: installable on mobile.
    - Service Workers: offline and caching.
    - Push notifications.
    - Auditing with Lighthouse.

---

## 📱 What is a PWA?

A **PWA** (*Progressive Web App*) is a website that behaves like a native app: it can be **installed**, works **offline**, and sends **push notifications**. All with HTML, CSS, and JavaScript.

```
Normal website + manifest + service worker = PWA
```

!!! quote "PWAs are the future of the web"
    Twitter, Spotify, Pinterest, Starbucks... they all have PWAs. And they work just as well (or better) than their native apps, without going through app stores.

---

## 📄 The Manifest

The **manifest** is a JSON file that tells the browser how to install the app.

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
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#6a5acd">
```

### Key Properties

| Property | What it does |
| :--- | :--- |
| `name` | Full name of the app |
| `short_name` | Short name (for the icon) |
| `start_url` | Startup URL when opened |
| `display` | `standalone`, `fullscreen`, `minimal-ui`, `browser` |
| `theme_color` | Status bar color |
| `icons` | Icons in multiple sizes |

---

## ⚙ The Service Worker

The **Service Worker** is a script that runs in the background and acts as a proxy between the app and the network. It lets you cache resources and serve the app offline.

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

### Registering the Service Worker

```javascript
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then((reg) => console.log("SW registrado", reg))
    .catch((err) => console.error("Error", err));
}
```

!!! tip "Production only"
    Service Workers require HTTPS (or localhost). Make sure your site uses HTTPS before registering one.

---

## 🔄 Caching Strategies

| Strategy | What it does |
| :--- | :--- |
| **Cache first** | Checks cache first; if missing, goes to the network |
| **Network first** | Goes to the network first; if it fails, checks cache |
| **Stale while revalidate** | Returns cached response and updates in the background |
| **Cache only** | Cache only (fully offline) |
| **Network only** | Network only (no cache) |

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

## 🔔 Push Notifications

```javascript
// Request permission
const permiso = await Notification.requestPermission();
if (permiso === "granted") {
  new Notification("¡Hola!", {
    body: "Bienvenido a Mi App",
    icon: "/icon-192.png"
  });
}
```

### Push from the Server

```javascript
// In the service worker
self.addEventListener("push", (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: "/icon-192.png"
  });
});
```

!!! warning "Don't ask for permission on load"
    Ask for notification permission **after** the user takes a meaningful action (buying, signing up, etc.). If you ask on page load, most users will deny it.

---

## 🔍 Auditing with Lighthouse

```bash
# In Chrome DevTools
F12 -> Lighthouse -> Analyze
# Categories to check: PWA, Performance, Accessibility
```

| PWA Requirement | How to meet it |
| :--- | :--- |
| HTTPS | SSL certificate (free Let's Encrypt) |
| Manifest | Linked manifest.json file |
| Service Worker | Registered and caching |
| Icons | 192x192 and 512x512 |
| start_url | Defined in the manifest |

---

## ✅ Best Practices

- ✅ **HTTPS is mandatory**: without it there is no PWA.
- ✅ **Cache only what you need**: don't bloat the cache.
- ✅ **Update the cache** when deploying a new version.
- ✅ **Ask for notification permission with context**.
- ✅ **Test offline**: disconnect the network and verify it works.
- ✅ **Use Workbox** if the project is large.
- ❌ **Don't cache HTML forever**: users won't see updates.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-22">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which file defines how a PWA is installed?</p>
<button class="quiz-option" data-opt="a">A) service-worker.js</button>
<button class="quiz-option" data-opt="b">B) manifest.json</button>
<button class="quiz-option" data-opt="c">C) index.html</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> What allows a PWA to work offline?</p>
<button class="quiz-option" data-opt="a">A) The Service Worker</button>
<button class="quiz-option" data-opt="b">B) The manifest</button>
<button class="quiz-option" data-opt="c">C) HTML</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which strategy returns cached content and updates in the background?</p>
<button class="quiz-option" data-opt="a">A) Cache first</button>
<button class="quiz-option" data-opt="b">B) Network first</button>
<button class="quiz-option" data-opt="c">C) Stale while revalidate</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2022%3A%20PWA&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F22-pwa%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F22-pwa%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2022%3A%20PWA%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F22-pwa%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/22-pwa/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 23 — WebSockets y tiempo real](23-websockets.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }