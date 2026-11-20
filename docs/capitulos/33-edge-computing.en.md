---
description: "Chapter 33 of the Web Developer's Book: 33 — Edge Computing. Learn step by step with examples, exercises, and quizzes."
---
# 33 — Edge Computing

!!! abstract "What you will learn"
    - What Edge Computing is and why it matters.
    - The difference between a traditional CDN and Edge Functions.
    - Popular platforms: Cloudflare Workers, Vercel Edge, Deno Deploy.
    - Real-world use cases: personalization, A/B testing, geolocation.
    - Limitations and when NOT to use edge.

---

## 🌍 What is Edge Computing?

**Edge Computing** is running code **as close to the user as possible**, instead of on a central server. Rather than routing every request to a single data center, requests are handled across a global network of nodes.

!!! quote "The supermarket analogy"
    A central server is like having **one single store in Madrid** for all of Spain: convenient for the owner, yet a customer in Barcelona takes 6 hours to get there. Edge Computing is like having **a store in every city**: same goods, much closer to the customer.

~~~mermaid
graph LR
    U1[Madrid User] --> E1[Madrid Edge]
    U2[Tokyo User] --> E2[Tokyo Edge]
    U3[NY User] --> E3[NY Edge]
    E1 --> DB[(Central Database)]
    E2 --> DB
    E3 --> DB
~~~

Each user reaches the **nearest node**, which responds in milliseconds.

---

## ⚡ CDN vs. Edge Functions

| | **Traditional CDN** | **Edge Functions** |
| :--- | :--- | :--- |
| What it does | Serves **static files** (HTML, CSS, JS, images) | Runs **code** at the edge node |
| Logic | None (caching only) | JavaScript, TypeScript, Rust, WASM |
| Personalization | Limited to headers | Full (read cookies, geolocation, etc.) |
| Latency | Low for static assets | Low for **everything** (including logic) |
| Example | Cloudflare CDN, Fastly | Cloudflare Workers, Vercel Edge |

**CDN** = delivering files.
**Edge** = delivering files **and running code** near the user.

!!! tip "Rule of thumb"
    Use a CDN for all static assets (images, fonts, client JS). Use Edge Functions for logic that benefits from proximity to the user: redirects, personalization, authentication, geolocation.

---

## 🚀 Popular Platforms

| Platform | Language | Free Tier | Ideal Use Cases |
| :--- | :--- | :--- | :--- |
| **Cloudflare Workers** | JS/TS, Rust, WASM | 100,000 req/day | Lightweight APIs, middleware, A/B testing |
| **Vercel Edge Functions** | JS/TS | 100 GB-hours/month | Next.js apps, personalization |
| **Deno Deploy** | JS/TS | 100,000 req/day | APIs, bots, webhooks |
| **Netlify Edge Functions** | JS/TS | 1M invocations/month | JAMstack middleware |
| **AWS Lambda@Edge** | Node.js, Python | Pay per use | CloudFront integration |

!!! warning "Not all edge platforms are equal"
    Cloudflare Workers uses **V8 Isolates** (not containers), starting up in **less than 5 ms**. Traditional Lambdas take **100-500 ms** on cold start. For edge, isolates are the standard.

---

## 🧩 Real-World Use Cases

### 1. Geolocation and Redirects

~~~javascript
// Cloudflare Worker: redirects based on country
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

### 2. Backendless A/B Testing

~~~javascript
// Vercel Edge Function: assigns variant from cookie
export const config = { runtime: "edge" };

export default function handler(request) {
    const cookie = request.headers.get("cookie") || "";
    const variant = cookie.includes("variant=b") ? "b" : "a";
    return new Response(JSON.stringify({ variant }), {
        headers: { "content-type": "application/json" },
    });
}
~~~

### 3. HTML Personalization

~~~javascript
// Deno Deploy: injects user name into HTML
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

### 4. Edge Authentication

Validating a JWT at the edge avoids hitting the central server. Invalid tokens are rejected in **milliseconds** without consuming backend resources.

!!! tip "Most common pattern"
    **Authentication middleware at the edge** + **business logic on the central server**. The edge filters out 90% of malicious traffic; the server only processes legitimate requests.

---

## ⚠ Edge Limitations

| Limitation | Why |
| :--- | :--- |
| **No persistent local state** | Each request may hit a different node |
| **No filesystem** | Only standard Web APIs (fetch, KV, D1, R2) |
| **Short timeouts** | Cloudflare Workers: 50 ms CPU per request (free) |
| **Memory limits** | Typically 128 MB |
| **Restricted APIs** | No `fs`, `child_process`, or native Node modules |
| **Cold starts (some)** | Vercel/Netlify can have slower startups |

!!! warning "When NOT to use edge"
    - Heavy processing (images, video, ML).
    - Operations needing shared real-time state.
    - Logic relying on a high-latency traditional relational DB (unless using serverless D1/Turso/Neon).
    - Long-running tasks (greater than 30 s).

---

## 🏗 Typical Edge Architecture

~~~mermaid
graph TD
    U[User] --> C[Edge CDN]
    C -->|static| H[HTML/CSS/JS]
    C -->|dynamic| F[Edge Function]
    F -->|auth| A[Edge Auth]
    A -->|valid| B[Central Backend]
    A -->|invalid| R[401 Unauthorized]
    B --> DB[(Database)]
~~~

**Flow:**
1. The user requests a page.
2. The CDN serves static files.
3. If logic is needed, the Edge Function runs it.
4. Only valid requests reach the central backend.

---

## 🧪 Hands-On Exercise

!!! example "Authentication middleware at the edge"
    Write an Edge Function (Cloudflare Workers) that:

    - Reads an `Authorization: Bearer <token>` header.
    - Lets the request pass through if the token is `"secreto123"`.
    - Otherwise returns `401 Unauthorized` with JSON `{ "error": "No autorizado" }`.

??? success "Solution"
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

!!! question "Check what you learned"

??? success "1. What is the difference between a CDN and an Edge Function?"
    A CDN only serves static files; an Edge Function executes code at the node closest to the user.

??? success "2. Why is Cloudflare Workers faster than Lambda@Edge on cold start?"
    Workers uses **V8 Isolates** (startup less than 5 ms) instead of containers (startup 100-500 ms).

??? success "3. What should you NOT do at the edge?"
    Heavy processing (images, video, ML), operations with shared real-time state, or tasks over 30 s.

??? success "4. What is the most common edge pattern in production?"
    Authentication middleware at the edge + business logic on the central server.

??? success "5. Which APIs do Cloudflare Edge Functions use to run?"
    **Standard Web APIs** (fetch, Request, Response, URL, crypto). They do not have access to `fs`, `child_process`, or native Node modules.

---

## 📚 Resources

- [Cloudflare Workers — Docs](https://developers.cloudflare.com/workers/)
- [Vercel Edge Functions — Docs](https://vercel.com/docs/functions/edge-functions)
- [Deno Deploy — Docs](https://deno.com/deploy)
- [The Edge Computing Landscape (artículo)](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/)
- [V8 Isolates vs contenedores (explicación)](https://blog.cloudflare.com/cloud-computing-without-containers/)

---

➡ Next chapter: [34 — Docker](34-docker.md)


---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-33">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What is the difference between a CDN and an Edge Function?</p>
<button class="quiz-option" data-opt="a">A) None</button>
<button class="quiz-option" data-opt="b">B) CDN serves files, Edge runs code</button>
<button class="quiz-option" data-opt="c">C) Edge only serves images</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> Why is Cloudflare Workers fast?</p>
<button class="quiz-option" data-opt="a">A) It uses containers</button>
<button class="quiz-option" data-opt="b">B) It uses V8 Isolates</button>
<button class="quiz-option" data-opt="c">C) It uses databases</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> When should you NOT use edge?</p>
<button class="quiz-option" data-opt="a">A) For authentication</button>
<button class="quiz-option" data-opt="b">B) For redirects</button>
<button class="quiz-option" data-opt="c">C) For heavy processing</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2033%3A%20Edge%20Computing&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F33-edge-computing%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F33-edge-computing%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/33-edge-computing/" aria-label="Copy link">Copy link</button>
</div>