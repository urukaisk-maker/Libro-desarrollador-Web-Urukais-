---
description: "Chapter 32 of the Web Developer's Book: 32 — Server Components. Learn step by step with examples, exercises, and quizzes."
---
# 32 — Server Components

!!! abstract "What you will learn"
    - What React Server Components (RSC) are and what problem they solve.
    - The difference between Server and Client Components.
    - How the hybrid rendering model works.
    - When to use each component type.
    - Common pitfalls and best practices.

---

## 🌐 What Are Server Components?

**React Server Components (RSC)** are components that run **on the server** and send a serialized React tree to the client, without including those components' JavaScript code in the browser bundle.

!!! quote "The restaurant analogy"
    A **Client Component** is like cooking at home: you have every ingredient and utensil (JavaScript) in your kitchen (browser), even if you don't use them all. A **Server Component** is like ordering delivery: the restaurant (server) cooks and sends you the finished dish (HTML/serialized React) without you having to lug the whole kitchen around.

~~~mermaid
graph LR
    A[Source Code] --> B{Server or Client?}
    B -->|Server Component| C[Runs on server]
    B -->|Client Component| D[Runs in browser]
    C --> E[Serializes to RSC Payload]
    D --> F[Sends JS to bundle]
    E --> G[Renders in browser]
    F --> G
~~~

---

## 🏛 Server vs. Client Components

| Feature | **Server Component** | **Client Component** |
| :--- | :--- | :--- |
| Directive | None (default in App Router) | `"use client"` at top of file |
| Runs on | Server | Browser (and server during SSR) |
| Backend access | ✅ Direct (database, FS, secrets) | ❌ Via API only |
| Hooks (`useState`, `useEffect`) | ❌ No | ✅ Yes |
| Event handlers (`onClick`, etc.) | ❌ No | ✅ Yes |
| Browser APIs (`window`, `localStorage`) | ❌ No | ✅ Yes |
| Adds to JS bundle size | ❌ No | ✅ Yes |
| Can import Client Components | ✅ Yes | ✅ Yes |
| Can import Server Components | ❌ No (but can receive as `children`) | ❌ No |

!!! tip "Rule of thumb"
    **Server Component by default**. Only add `"use client"` when you need interactivity (hooks, events, browser APIs).

---

## 🔄 The Hybrid Model

In Next.js App Router (and similar frameworks), components are **Server by default**. Communication flows like this:

~~~mermaid
sequenceDiagram
    participant C as Client (browser)
    participant S as Server
    participant DB as Database
    C->>S: Page request
    S->>DB: Direct query
    DB->>S: Data
    S->>S: Renders Server Components
    S->>C: RSC Payload + HTML + Client Component JS
    C->>C: Hydrates Client Components
~~~

**Flow:**
1. The browser requests a route.
2. The server runs Server Components (including database queries).
3. The server serializes the result and sends:
   - Initial **HTML** (for fast first paint).
   - The **RSC Payload** (component structure for hydration).
   - **Client Component JS** (for interactivity).
4. The browser **hydrates** Client Components.

---

## 🏷 The `"use client"` Directive

It is a **string literal** at the top of a file (before any import) that marks the entry point into client code:

~~~javascript
"use client";

import { useState } from "react";

export default function Contador() {
    const [n, setN] = useState(0);
    return <button onClick={() => setN(n + 1)}>Clicks: {n}</button>;
}
~~~

!!! warning "Not a magic directive"
    `"use client"` **does not** mean "this only runs in the browser". The component also renders on the server (SSR), while its **JS code** is shipped to the browser for hydration. What changes is that it can use hooks and event handlers.

**Boundary rules:**
- A Client Component **cannot** import a Server Component.
- However, it **can receive one as `children`** or as a prop (the "children pattern").

~~~javascript
// page.js (Server Component)
import ClientWrapper from "./client-wrapper";
import ServerChart from "./server-chart"; // is a Server Component

export default function Page() {
    return (
        <ClientWrapper>
            <ServerChart />
        </ClientWrapper>
    );
}
~~~

~~~javascript
// client-wrapper.js
"use client";
export default function ClientWrapper({ children }) {
    return <div onClick={() => console.log("click")}>{children}</div>;
}
~~~

---

## 🎯 When to Use Each One

### Server Component (Default)

- ✅ Data fetching (DB, external APIs, FS).
- ✅ Accessing environment variables and secrets.
- ✅ Rendering static or data-driven content.
- ✅ Large non-interactive components (lists, layouts, pages).
- ✅ Shrinking the client JS bundle.

### Client Component (`"use client"`)

- ✅ `useState`, `useEffect`, `useReducer`, `useContext`.
- ✅ Event handlers (`onClick`, `onChange`, `onSubmit`).
- ✅ Browser APIs (`window`, `document`, `localStorage`, `IntersectionObserver`).
- ✅ DOM-dependent libraries (Chart.js, Mapbox, etc.).

!!! tip "Isolate interactivity"
    A strong pattern is pairing **Server pages** with **Client islands**: the page renders on the server, and only interactive parts (buttons, forms, modals) use `"use client"`. That keeps the JS bundle small.

---

## 📝 Complete Example: Dashboard

~~~javascript
// app/dashboard/page.js  (Server Component)
import { db } from "@/lib/db";
import BotonRefrescar from "./boton-refrescar";

export default async function Dashboard() {
    const ventas = await db.ventas.findMany(); // direct query
    const total = ventas.reduce((s, v) => s + v.monto, 0);

    return (
        <div>
            <h1>Ventas totales: {total} €</h1>
            <ul>
                {ventas.map((v) => (
                    <li key={v.id}>{v.producto}: {v.monto} €</li>
                ))}
            </ul>
            <BotonRefrescar />
        </div>
    );
}
~~~

~~~javascript
// app/dashboard/boton-refrescar.js  (Client Component)
"use client";

import { useRouter } from "next/navigation";

export default function BotonRefrescar() {
    const router = useRouter();
    return <button onClick={() => router.refresh()}>Refrescar</button>;
}
~~~

**What you get:**
- The DB query runs **on the server** (the client never sees credentials).
- The browser JS bundle **does not include** dashboard code, only the button's.
- The button itself is interactive (Client Component).

---

## ⚠ Common Mistakes

| Error | What Happens | Fix |
| :--- | :--- | :--- |
| Using `useState` in a Server Component | Build error | Add `"use client"` to the file |
| Importing `fs` or `pg` in a Client Component | Build error (modules unavailable) | Move logic to a Server Component |
| Importing a Server Component inside a Client Component | Build error | Pass it as `children` or a prop |
| Forgetting `"use client"` on a component with `onClick` | Error: "Event handlers cannot be passed to Client Component props" | Add `"use client"` |
| Accessing `window` on initial render | Hydration error | Wrap in `useEffect` or check `typeof window !== "undefined"` |

!!! warning "Most common error"
    `Event handlers cannot be passed to Client Component props`. Happens when trying to pass a function (such as `onClick`) from a Server Component to a Client Component. Props crossing from Server to Client must be **serializable** (numbers, strings, arrays, plain objects)—not functions.

---

## 🏗 Recommended Architecture

~~~mermaid
graph TD
    A[app/layout.js] -->|Server| B[app/page.js]
    B -->|Server| C[Product list]
    B -->|Server| D[Product detail]
    C -->|Client island| E[Add to cart button]
    D -->|Client island| F[Quantity selector]
    E --> G[Cart context]
    F --> G
~~~

**Rule:** Server at the top, Client at the leaves (islands).

---

## 🧪 Hands-On Exercise

!!! example "Turn an interactive component into a hybrid"
    You have a component with a counter. Split it into:

    - A **Server Component** `Producto` that loads product data (simulated via `fetch` to an API).
    - A **Client Component** `Contador` with a button that increments by 1 on click.

    The Server Component should render the product name and the Client Component below it.

??? success "Solution"
    ~~~javascript
    // app/producto/page.js  (Server Component)
    import Contador from "./contador";

    async function getProducto() {
        return { id: 1, nombre: "Teclado mecánico", precio: 89 };
    }

    export default async function Producto() {
        const prod = await getProducto();
        return (
            <div>
                <h1>{prod.nombre}</h1>
                <p>Precio: {prod.precio} €</p>
                <Contador />
            </div>
        );
    }
    ~~~

    ~~~javascript
    // app/producto/contador.js  (Client Component)
    "use client";
    import { useState } from "react";

    export default function Contador() {
        const [n, setN] = useState(0);
        return (
            <div>
                <p>Cantidad: {n}</p>
                <button onClick={() => setN(n + 1)}>Añadir uno</button>
            </div>
        );
    }
    ~~~

---

## 🧠 Quiz

!!! question "Check what you learned"

??? success "1. Are Server Components sent to the browser bundle?"
    No. Only the **RSC Payload** (serialized representation) is sent. The component's JS code stays on the server.

??? success "2. What is `"use client"` for?"
    It marks the entry point into client code. It indicates that the component and its imports can use hooks, event handlers, and browser APIs, and includes its JS in the bundle.

??? success "3. Can a Client Component import a Server Component?"
    Not directly. However, it can receive one as `children` or as a prop from a parent Server Component.

??? success "4. What kind of props can pass from Server to Client?"
    Only **serializable** props: strings, numbers, booleans, arrays, plain objects, dates, `null` (and `undefined` is allowed). Not functions, classes, or symbols.

??? success "5. What is the recommended architecture pattern?"
    **Server at the top, Client at the leaves**: pages and layouts on the server, interactive islands (buttons, forms, modals) as Client Components.

---

## 📚 Resources

- [React — Server Components (docs oficiales)](https://react.dev/reference/rsc/server-components)
- [Next.js — Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Next.js — Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [RFC original de React Server Components](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md)
- [Patrones de composición Server/Client](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

---

➡ Next chapter: [33 — Edge Computing](33-edge-computing.md)


---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-32">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Are Server Components sent to the browser bundle?</p>
<button class="quiz-option" data-opt="a">A) Yes</button>
<button class="quiz-option" data-opt="b">B) No</button>
<button class="quiz-option" data-opt="c">C) Only if interactive</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> What is use client used for?</p>
<button class="quiz-option" data-opt="a">A) Marking a component as client</button>
<button class="quiz-option" data-opt="b">B) Marking a component as server</button>
<button class="quiz-option" data-opt="c">C) Removing a component</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>3.</strong> Can a Client Component import a Server Component?</p>
<button class="quiz-option" data-opt="a">A) Yes, directly</button>
<button class="quiz-option" data-opt="b">B) No, but it can receive it as children</button>
<button class="quiz-option" data-opt="c">C) Yes, with lazy loading</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2032%3A%20Server%20Components&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F32-server-components%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F32-server-components%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/32-server-components/" aria-label="Copy link">Copy link</button>
</div>