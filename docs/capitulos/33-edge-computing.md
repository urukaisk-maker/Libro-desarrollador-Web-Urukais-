# 33 — Edge Computing

!!! abstract "Qué vas a aprender"
    - Qué es Edge Computing y por qué importa.
    - La diferencia entre CDN tradicional y edge functions.
    - Plataformas populares: Cloudflare Workers, Vercel Edge, Deno Deploy.
    - Casos de uso reales: personalización, A/B testing, geolocalización.
    - Limitaciones y cuándo NO usar edge.

---

## 🌍 ¿Qué es Edge Computing?

**Edge Computing** (computación en el borde) es ejecutar código **lo más cerca posible del usuario**, en lugar de en un servidor central. En vez de que todas las peticiones viajen al mismo datacenter, se distribuyen por una red global de nodos.

!!! quote "La analogía del supermercado"
    Un servidor central es como tener **una única tienda en Madrid** para toda España: cómodo para el dueño, pero el cliente de Barcelona tarda 6 horas en llegar. Edge Computing es tener **una tienda en cada ciudad**: misma mercancía, pero mucho más cerca del cliente.

~~~mermaid
graph LR
    U1[Usuario Madrid] --> E1[Edge Madrid]
    U2[Usuario Tokio] --> E2[Edge Tokio]
    U3[Usuario NY] --> E3[Edge NY]
    E1 --> DB[(Base de datos central)]
    E2 --> DB
    E3 --> DB
~~~

Cada usuario llega al **nodo más cercano**, que responde en milisegundos.

---

## ⚡ CDN vs Edge Functions

| | **CDN tradicional** | **Edge Functions** |
| :--- | :--- | :--- |
| Qué hace | Sirve **archivos estáticos** (HTML, CSS, JS, imágenes) | Ejecuta **código** en el nodo |
| Lógica | Ninguna (solo cachea) | JavaScript, TypeScript, Rust, WASM |
| Personalización | Limitada a headers | Completa (leer cookies, geolocalización, etc.) |
| Latencia | Baja para estáticos | Baja para **todo** (incluida lógica) |
| Ejemplo | Cloudflare CDN, Fastly | Cloudflare Workers, Vercel Edge |

**CDN** = repartir archivos.
**Edge** = repartir archivos **y ejecutar código** cerca del usuario.

!!! tip "Regla práctica"
    Usa CDN para todo lo estático (imágenes, fuentes, JS del cliente). Usa Edge Functions para lógica que se beneficia de estar cerca del usuario: redirecciones, personalización, autenticación, geolocalización.

---

## 🚀 Plataformas populares

| Plataforma | Lenguaje | Free tier | Casos ideales |
| :--- | :--- | :--- | :--- |
| **Cloudflare Workers** | JS/TS, Rust, WASM | 100.000 req/día | APIs ligeras, middleware, A/B testing |
| **Vercel Edge Functions** | JS/TS | 100 GB-horas/mes | Apps Next.js, personalización |
| **Deno Deploy** | JS/TS | 100.000 req/día | APIs, bots, webhooks |
| **Netlify Edge Functions** | JS/TS | 1M invocaciones/mes | Middleware de JAMstack |
| **AWS Lambda@Edge** | Node.js, Python | Pago por uso | Integración con CloudFront |

!!! warning "No todas son iguales"
    Cloudflare Workers usa **V8 Isolates** (no contenedores), arranque en **<5 ms**. Las Lambdas tradicionales tardan **100-500 ms** en cold start. Para edge, los isolates son la norma.

---

## 🧩 Casos de uso reales

### 1. Geolocalización y redirección

~~~javascript
// Cloudflare Worker: redirige según el país
export default {
    async fetch(request) {
        const country = request.cf.country;
        if (country === "ES") {
            return Response.redirect("https://es.mi-sitio.com", 302);
        }
        return fetch(request);
    },
};
~~~

### 2. A/B testing sin backend

~~~javascript
// Vercel Edge Function: asigna variante según cookie
export const config = { runtime: "edge" };

export default function handler(request) {
    const cookie = request.headers.get("cookie") || "";
    const variant = cookie.includes("variant=b") ? "b" : "a";
    return new Response(JSON.stringify({ variant }), {
        headers: { "content-type": "application/json" },
    });
}
~~~

### 3. Personalización de HTML

~~~javascript
// Deno Deploy: inyecta el nombre del usuario en el HTML
Deno.serve(async (req) => {
    const url = new URL(req.url);
    const user = url.searchParams.get("user") || "invitado";
    const res = await fetch("https://mi-sitio.com/index.html");
    const html = await res.text();
    const personalized = html.replace("{{user}}", user);
    return new Response(personalized, {
        headers: { "content-type": "text/html" },
    });
});
~~~

### 4. Autenticación en el borde

Validar un JWT en el edge evita llegar al servidor central. Si el token no es válido, se rechaza en **milisegundos** sin consumir recursos del backend.

!!! tip "El patrón más común"
    **Middleware de autenticación en el edge** + **lógica de negocio en el servidor central**. El edge filtra el 90% del tráfico malicioso; el servidor solo procesa peticiones legítimas.

---

## ⚠️ Limitaciones de Edge

| Limitación | Por qué |
| :--- | :--- |
| **Sin estado persistente local** | Cada petición puede ir a un nodo distinto |
| **Sin sistema de archivos** | Solo hay APIs web estándar (fetch, KV, D1, R2) |
| **Timeouts cortos** | Cloudflare Workers: 50 ms de CPU por petición (free) |
| **Memoria limitada** | Típicamente 128 MB |
| **APIs limitadas** | No hay `fs`, `child_process`, ni módulos nativos de Node |
| **Cold start (en algunos)** | Vercel/Netlify pueden tener arranques lentos |

!!! warning "Cuándo NO usar edge"
    - Procesamiento pesado (imágenes, vídeo, ML).
    - Operaciones que necesitan estado compartido en tiempo real.
    - Lógica que depende de una base de datos relacional tradicional con latencia (a menos que uses D1/Turso/Neon serverless).
    - Tareas de larga duración (>30 s).

---

## 🏗 Arquitectura edge típica

~~~mermaid
graph TD
    U[Usuario] --> C[CDN edge]
    C -->|estático| H[HTML/CSS/JS]
    C -->|dinámico| F[Edge Function]
    F -->|autenticación| A[Auth en el edge]
    A -->|válido| B[Backend central]
    A -->|inválido| R[401 Unauthorized]
    B --> DB[(Base de datos)]
~~~

**Flujo:**
1. El usuario pide una página.
2. El CDN sirve los archivos estáticos.
3. Si hay lógica, la Edge Function la ejecuta.
4. Solo las peticiones válidas llegan al backend central.

---

## 🧪 Ejercicio práctico

!!! example "Middleware de autenticación en el edge"
    Escribe una Edge Function (Cloudflare Workers) que:

    - Lea un header `Authorization: Bearer <token>`.
    - Si el token es `"secreto123"`, deje pasar la petición.
    - Si no, devuelva `401 Unauthorized` con un JSON `{ "error": "No autorizado" }`.

??? success "Solución"
    ~~~javascript
    export default {
        async fetch(request) {
            const auth = request.headers.get("Authorization") || "";
            const token = auth.replace("Bearer ", "");

            if (token !== "secreto123") {
                return new Response(
                    JSON.stringify({ error: "No autorizado" }),
                    {
                        status: 401,
                        headers: { "content-type": "application/json" },
                    }
                );
            }

            return fetch(request);
        },
    };
    ~~~

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué diferencia hay entre CDN y Edge Function?"
    La CDN solo sirve archivos estáticos; la Edge Function ejecuta código en el nodo más cercano al usuario.

??? success "2. ¿Por qué Cloudflare Workers es más rápido que Lambda@Edge en cold start?"
    Workers usa **V8 Isolates** (arranque <5 ms) en lugar de contenedores (arranque 100-500 ms).

??? success "3. ¿Qué NO deberías hacer en el edge?"
    Procesamiento pesado (imágenes, vídeo, ML), operaciones con estado compartido en tiempo real, o tareas de más de 30 s.

??? success "4. ¿Cuál es el patrón más común de edge en producción?"
    Middleware de autenticación en el edge + lógica de negocio en el servidor central.

??? success "5. ¿Qué API usan las Edge Functions de Cloudflare para ejecutarse?"
    Las **Web APIs estándar** (fetch, Request, Response, URL, crypto). No tienen acceso a `fs`, `child_process` ni módulos nativos de Node.

---

## 📚 Recursos

- [Cloudflare Workers — Docs](https://developers.cloudflare.com/workers/)
- [Vercel Edge Functions — Docs](https://vercel.com/docs/functions/edge-functions)
- [Deno Deploy — Docs](https://deno.com/deploy)
- [The Edge Computing Landscape (artículo)](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/)
- [V8 Isolates vs contenedores (explicación)](https://blog.cloudflare.com/cloud-computing-without-containers/)

---

➡️ Siguiente capítulo: [34 — Docker](34-docker.md)


---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-33">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué diferencia hay entre CDN y Edge Function?</p>
<button class="quiz-option" data-opt="a">A) Ninguna</button>
<button class="quiz-option" data-opt="b">B) CDN sirve archivos, Edge ejecuta código</button>
<button class="quiz-option" data-opt="c">C) Edge solo sirve imágenes</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> ¿Por qué Cloudflare Workers es rápido?</p>
<button class="quiz-option" data-opt="a">A) Usa contenedores</button>
<button class="quiz-option" data-opt="b">B) Usa V8 Isolates</button>
<button class="quiz-option" data-opt="c">C) Usa bases de datos</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Cuándo NO usar edge?</p>
<button class="quiz-option" data-opt="a">A) Para autenticación</button>
<button class="quiz-option" data-opt="b">B) Para redirecciones</button>
<button class="quiz-option" data-opt="c">C) Para procesamiento pesado</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2033%3A%20Edge%20Computing&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F33-edge-computing%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F33-edge-computing%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/33-edge-computing/" aria-label="Copiar enlace">Copiar enlace</button>
</div>
