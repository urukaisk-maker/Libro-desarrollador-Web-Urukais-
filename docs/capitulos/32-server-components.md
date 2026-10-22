# 32 — Server Components

!!! abstract "Qué vas a aprender"
    - Qué son los React Server Components (RSC).
    - Diferencia entre SSR y RSC.
    - Cuándo usar Server Components y cuándo Client Components.
    - Streaming y Suspense.
    - Frameworks que los soportan.

---

## 🖥️ ¿Qué son los Server Components?

Los **Server Components** son componentes de React que se ejecutan **solo en el servidor**. No envían JavaScript al cliente, lo que reduce el bundle y mejora el rendimiento.

```
Server Component  → se ejecuta en el servidor, no envía JS al cliente
Client Component  → se ejecuta en el navegador, es interactivo
```

!!! quote "El mejor código es el que no se envía"
    Un Server Component no manda ni una línea de JavaScript al navegador. Eso es menos datos, menos tiempo de parseo y menos consumo de batería.

---

## 🔄 SSR vs RSC

| Característica | SSR (Server-Side Rendering) | RSC (React Server Components) |
| :--- | :--- | :--- |
| Qué renderiza | HTML en el servidor | Componentes en el servidor |
| JS al cliente | Sí, la app entera | No, solo los Client Components |
| Hidratación | Toda la app | Solo las partes interactivas |
| Estado | Sí | No (solo datos) |
| useEffect | Sí | No |

---

## 🧩 Server Components

```jsx
// app/page.jsx (Server Component por defecto en Next.js App Router)
async function Pagina() {
  const posts = await fetch("https://api.ejemplo.com/posts").then(r => r.json());

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((p) => <li key={p.id}>{p.title}</li>)}
      </ul>
    </main>
  );
}
```

Puedes usar `async/await` directamente en el componente. No hay `useEffect`, ni `useState`, ni eventos.

---

## 🖱️ Client Components

Para interactividad, necesitas Client Components. Se marcan con `"use client"`:

```jsx
"use client";

import { useState } from "react";

export function Boton() {
  const [clicks, setClicks] = useState(0);
  return <button onClick={() => setClicks(clicks + 1)}>Clics: {clicks}</button>;
}
```

| Puedes usar | Server Component | Client Component |
| :--- | :--- | :--- |
| `async/await` | ✅ | ❌ |
| `useState`, `useEffect` | ❌ | ✅ |
| Eventos (`onClick`) | ❌ | ✅ |
| APIs del navegador (`window`) | ❌ | ✅ |
| Acceso a base de datos | ✅ | ❌ |

---

## 🌊 Streaming y Suspense

Los Server Components permiten **streaming**: enviar HTML por trozos mientras se genera. Con `<Suspense>`:

```jsx
import { Suspense } from "react";

export default function Pagina() {
  return (
    <main>
      <h1>Mi app</h1>
      <Suspense fallback={<p>Cargando posts...</p>}>
        <Posts />
      </Suspense>
    </main>
  );
}
```

El usuario ve el `<h1>` inmediatamente y los posts cuando terminan de cargar.

---

## 🛠️ Frameworks que los soportan

| Framework | Soporte RSC |
| :--- | :--- |
| **Next.js** (App Router) | ✅ Nativo |
| **Remix** | ⚠️ Parcial |
| **Astro** | ✅ Islas (similar) |
| **Waku** | ✅ Nativo |
| **RedwoodJS** | ✅ |
| **Vite + React** | ❌ Necesita plugin |

---

## ✅ Buenas prácticas

- ✅ **Server Components por defecto**: solo añade `"use client"` cuando necesites interactividad.
- ✅ **Mueve `"use client"` lo más abajo posible**: cuanto más abajo, menos JS se envía.
- ✅ **Fetch de datos en Server Components**: evita `useEffect` para cargar datos.
- ✅ **Usa Suspense** para streaming y estados de carga.
- ✅ **No pases funciones como props** de Server a Client Components (no son serializables).
- ✅ **Separa lógica de datos y UI interactiva**.
- ❌ **No uses `window` o `localStorage` en Server Components**.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-32">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Dónde se ejecutan los Server Components?</p>
<button class="quiz-option" data-opt="a">A) En el navegador</button>
<button class="quiz-option" data-opt="b">B) En el servidor</button>
<button class="quiz-option" data-opt="c">C) En ambos</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué directiva marca un Client Component?</p>
<button class="quiz-option" data-opt="a">A) "use client"</button>
<button class="quiz-option" data-opt="b">B) "use server"</button>
<button class="quiz-option" data-opt="c">C) "use browser"</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué componente de React permite mostrar un fallback mientras carga?</p>
<button class="quiz-option" data-opt="a">A) &lt;Lazy&gt;</button>
<button class="quiz-option" data-opt="b">B) &lt;Loading&gt;</button>
<button class="quiz-option" data-opt="c">C) &lt;Suspense&gt;</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2032%3A%20Server%20Components&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F32-server-components%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F32-server-components%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2032%3A%20Server%20Components%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F32-server-components%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/32-server-components/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 33 — Edge Computing](33-edge-computing.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
