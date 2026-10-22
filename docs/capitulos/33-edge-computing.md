# 33 — Edge Computing

!!! abstract "Qué vas a aprender"
    - Qué es el Edge Computing y por qué importa.
    - Cloudflare Workers, Vercel Edge y Deno Deploy.
    - Casos de uso reales.
    - Limitaciones y buenas prácticas.

---

## 🌍 ¿Qué es Edge Computing?

El **Edge Computing** consiste en ejecutar código en **servidores distribuidos geográficamente**, cerca del usuario. En lugar de un servidor central, hay cientos de nodos repartidos por el mundo.

```
Servidor central:  usuario en Madrid → servidor en Virginia (150 ms)
Edge Computing:    usuario en Madrid → servidor en Madrid (10 ms)
```

!!! quote "La latencia es la nueva velocidad"
    Cada milisegundo cuenta. Si tu usuario está en Tokio y tu servidor en Frankfurt, pierdes 250 ms solo en el viaje de ida y vuelta. El edge elimina ese viaje.

---

## ⚡ Cloudflare Workers

**Cloudflare Workers** es la plataforma de edge computing más popular. Ejecuta JavaScript/TypeScript en más de 300 ciudades del mundo.

```javascript
// worker.js
export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/saludo") {
      return Response.json({ mensaje: "Hola desde el edge" });
    }

    return new Response("Hola, mundo", {
      headers: { "Content-Type": "text/plain" }
    });
  }
};
```

```bash
npm install -g wrangler
wrangler login
wrangler deploy
```

---

## 🚀 Otras plataformas

| Plataforma | Runtime | Lenguajes |
| :--- | :--- | :--- |
| **Cloudflare Workers** | V8 isolates | JS/TS, Rust, C |
| **Vercel Edge Functions** | V8 isolates | JS/TS |
| **Deno Deploy** | Deno | JS/TS |
| **Netlify Edge Functions** | Deno | JS/TS |
| **AWS Lambda@Edge** | Node.js | JS/TS, Python |
| **Fastly Compute** | Wasm | Rust, Go, JS |

---

## 🎯 Casos de uso reales

| Caso | Por qué edge |
| :--- | :--- |
| **Personalización A/B** | Decidir variante en el edge sin llamar al backend |
| **Redirecciones geográficas** | Redirigir según país sin latencia |
| **Autenticación** | Validar JWT en el edge antes de llegar al origen |
| **Caché inteligente** | Cachear respuestas según reglas personalizadas |
| **Modificar HTML** | Inyectar headers o contenido en la respuesta |
| **Rate limiting** | Bloquear abuso antes de llegar al servidor |
| **Bots y seguridad** | Filtrar tráfico malicioso en el borde |

---

## ⚠️ Limitaciones

- **Runtime limitado**: no es Node.js completo (sin `fs`, sin sockets TCP).
- **Memoria limitada**: 128 MB por defecto en Cloudflare.
- **Tiempo de ejecución**: pocos milisegundos por petición.
- **Cold starts**: aunque son mucho más rápidos que Lambda, existen.
- **Debugging**: más complejo que en un servidor local.
- **Coste**: las peticiones al edge tienen coste (aunque hay tier gratis).

---

## ✅ Buenas prácticas

- ✅ **Usa el edge para lo que aporta valor**: latencia, personalización, seguridad.
- ✅ **Mantén el código pequeño**: cada KB cuenta en el edge.
- ✅ **Cachea en el edge** todo lo que puedas.
- ✅ **Valida en el edge** antes de llegar al origen.
- ✅ **Monitoriza el rendimiento** por región.
- ✅ **Prueba con latencias reales** (no solo en localhost).
- ❌ **No ejecutes operaciones pesadas** en el edge (procesamiento de imágenes, IA).
- ❌ **No uses bases de datos relacionales** en el edge (usa KV, D1, Redis).

---

## 🗄️ Almacenamiento en el edge

| Producto | Tipo |
| :--- | :--- |
| **Cloudflare KV** | Key-value distribuido |
| **Cloudflare D1** | SQLite distribuido |
| **Cloudflare R2** | Object storage (S3 compatible) |
| **Vercel KV** | Redis (Upstash) |
| **Vercel Postgres** | PostgreSQL serverless |
| **Upstash Redis** | Redis serverless |

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-33">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué es Edge Computing?</p>
<button class="quiz-option" data-opt="a">A) Ejecutar código en un servidor central</button>
<button class="quiz-option" data-opt="b">B) Ejecutar código cerca del usuario, distribuido geográficamente</button>
<button class="quiz-option" data-opt="c">C) Un tipo de base de datos</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué plataforma es la más popular de edge computing?</p>
<button class="quiz-option" data-opt="a">A) Cloudflare Workers</button>
<button class="quiz-option" data-opt="b">B) Heroku</button>
<button class="quiz-option" data-opt="c">C) DigitalOcean</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué ventaja principal ofrece el edge?</p>
<button class="quiz-option" data-opt="a">A) Más memoria</button>
<button class="quiz-option" data-opt="b">B) Más CPU</button>
<button class="quiz-option" data-opt="c">C">Menos latencia</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2033%3A%20Edge%20Computing&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F33-edge-computing%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F33-edge-computing%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2033%3A%20Edge%20Computing%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F33-edge-computing%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/33-edge-computing/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 34 — Docker para frontend](34-docker.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
