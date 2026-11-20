---
description: "Chapter 36 of the Web Developer's Book: 36 — Micro-frontends. Learn step by step with examples, exercises, and quizzes."
---
# 36 — Micro-frontends

!!! abstract "What you will learn"
    - What micro-frontends are and when to use them.
    - Module Federation with Vite.
    - Runtime composition.
    - Communication between micro-frontends.
    - Pros and cons.

---

## 🧩 What Are Micro-Frontends?

**Micro-frontends** split a large frontend application into **smaller, independent applications** that can be built, deployed, and scaled separately. They are the frontend equivalent of microservices.

```
Frontend monolith:  1 giant app, 1 team, 1 deployment
Micro-frontends:    N small apps, N teams, N deployments
```

!!! quote "Divide and conquer (on the frontend too)"
    When 50 developers work in the same repository, conflicts are constant. Micro-frontends let each team own its slice.

---

## 🎯 When to Use Micro-Frontends?

| Scenario | Micro-Frontends? |
| :--- | :--- |
| Large teams (10+ devs) | ✅ |
| Multiple independent teams | ✅ |
| Incremental migration from Angular to React | ✅ |
| Multiple products inside one platform | ✅ |
| Small project (1-3 devs) | ❌ |
| MVP or prototype | ❌ |
| App with heavy cross-slice interaction | ❌ |

---

## ⚡ Module Federation

**Module Federation** (Webpack 5, Vite 5+) lets one app load code from another at **runtime**, without duplicating dependencies.

### Host (Container)

```javascript
// host vite.config.js
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    federation({
      name: "host",
      remotes: {
        productos: "http://localhost:5001/assets/remoteEntry.js",
        carrito: "http://localhost:5002/assets/remoteEntry.js"
      },
      shared: ["react", "react-dom"]
    })
  ]
});
```

```jsx
import Productos from "productos/Productos";
import Carrito from "carrito/Carrito";

function App() {
  return (
    <div>
      <Productos/>
      <Carrito/>
    </div>
  );
}
```

### Remote

```javascript
// remote vite.config.js
export default defineConfig({
  plugins: [
    federation({
      name: "productos",
      filename: "remoteEntry.js",
      exposes: {
        "./Productos": "./src/Productos.jsx"
      },
      shared: ["react", "react-dom"]
    })
  ]
});
```

---

## 🔗 Runtime Composition

| Strategy | When It Composes |
| :--- | :--- |
| **Build time** | When building the app (npm packages) |
| **Run time** | When loading the app (Module Federation) |
| **Iframes** | Full isolation (but limited) |
| **Web Components** | Native composition |

!!! tip "Start simple"
    If you've never built micro-frontends, start with **Web Components** or **iframes**. Module Federation is powerful, but complex.

---

## 📡 Communication Between Micro-Frontends

Micro-frontends should communicate without tight coupling. Options:

| Strategy | When to Use It |
| :--- | :--- |
| **Custom Events** | Simple communication between apps |
| **Shared global state** | Small state (user, theme) |
| **URL / query params** | Navigation between apps |
| **Web Components** | Shared native components |
| **Event bus** | Complex communication (EventEmitter) |

```javascript
// App A dispatches an event
window.dispatchEvent(new CustomEvent("carrito:add", {
  detail: { productoId: 42 }
}));

// App B listens to it
window.addEventListener("carrito:add", (e) => {
  console.log("Añadido:", e.detail.productoId);
});
```

!!! warning "Watch out for coupling"
    If two micro-frontends talk to each other constantly, they probably shouldn't be separate micro-frontends. Excessive communication is a sign of poor domain boundaries.

---

## ⚖ Pros and Cons

### Pros

- ✅ **Independent teams**: each team deploys on its own schedule.
- ✅ **Organizational scalability**: add teams without stepping on toes.
- ✅ **Fault isolation**: if one micro-frontend goes down, the others keep running.
- ✅ **Incremental migration**: migrate one piece without rewriting everything.
- ✅ **Different tech stacks**: one team can use React, another Vue.

### Cons

- ❌ **Complexity**: more repos, more pipelines, more deployments.
- ❌ **Duplication**: each app loads its own dependencies.
- ❌ **Visual consistency**: you must share a design system.
- ❌ **Performance**: more requests, more JS.
- ❌ **Debugging**: harder to trace a flow across apps.
- ❌ **E2E testing**: harder to automate.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-36">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What are micro-frontends?</p>
<button class="quiz-option" data-opt="a">A) Small React components</button>
<button class="quiz-option" data-opt="b">B) Independent frontend apps composed together</button>
<button class="quiz-option" data-opt="c">C) Backend microservices</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which tool lets you share code at runtime?</p>
<button class="quiz-option" data-opt="a">A) Module Federation</button>
<button class="quiz-option" data-opt="b">B) Webpack</button>
<button class="quiz-option" data-opt="c">C) npm</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> When should you NOT use micro-frontends?</p>
<button class="quiz-option" data-opt="a">A) With large teams</button>
<button class="quiz-option" data-opt="b">B) During incremental migrations</button>
<button class="quiz-option" data-opt="c">C) In small projects with 1-3 devs</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2036%3A%20Micro-frontends&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F36-micro-frontends%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F36-micro-frontends%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2036%3A%20Micro-frontends%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F36-micro-frontends%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/36-micro-frontends/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 37 — Introduction to Generative AI](37-ia-generativa.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }