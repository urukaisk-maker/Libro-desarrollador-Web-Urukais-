---
description: "Chapter 13 of the Web Developer's Book: 13 — Modules and Bundlers. Learn step by step with examples, exercises, and quizzes."
---
# 13 — Modules and Bundlers

!!! abstract "What you will learn"
    - Why modules exist in JavaScript.
    - Differences between CommonJS, ESM, UMD, and AMD.
    - What a bundler is and what problem it solves.
    - Modern bundlers: Vite, esbuild, Rollup, webpack.
    - When to use a bundler and when not to.

---

## 📦 The Module Problem

In 1995, JavaScript didn't have modules. All code lived in the **global scope**, and any variable could collide with another.

~~~html
<script src="a.js"></script>
<script src="b.js"></script>
<!-- If a.js and b.js both define "contador", they overwrite each other -->
~~~

**Modules** solve this: each file has its own scope, exports what it chooses, and another file explicitly imports it.

!!! quote "The labeled boxes analogy"
    Without modules, all your code is **scattered on the living room floor**: anyone can step on it, move it, or mix it up. With modules, each piece has its own **labeled box**, and you only open the box you need.

~~~mermaid
graph LR
    A[main.js] -->|imports| B[math.js]
    A -->|imports| C[ui.js]
    C -->|imports| D[api.js]
    B -.exports.-> A
    C -.exports.-> A
    D -.exports.-> C
~~~

---

## 🏛 Module Systems

| System | When | Syntax | Environment |
| :--- | :--- | :--- | :--- |
| **CommonJS (CJS)** | 2009 | `require` / `module.exports` | Classic Node.js |
| **ES Modules (ESM)** | 2015 (ES6) | `import` / `export` | Modern Node.js, browsers |
| **UMD** | 2011 | `define(...)` or global | Universal libraries |
| **AMD** | 2010 | `define(...)` | Legacy (RequireJS) |

### CommonJS (Classic Node)

~~~javascript
// math.js
function sumar(a, b) {
    return a + b;
}
module.exports = { sumar };

// main.js
const { sumar } = require("./math.js");
console.log(sumar(2, 3));
~~~

### ES Modules (Modern Standard)

~~~javascript
// math.js
export function sumar(a, b) {
    return a + b;
}
export const PI = 3.1416;

// main.js
import { sumar, PI } from "./math.js";
console.log(sumar(2, 3), PI);
~~~

!!! tip "ESM is the future (and the present)"
    All modern browsers support ESM natively (`<script type="module">`). Node.js does too since v12+. Use ESM in new projects.

### Key Differences

| Aspect | CommonJS | ESM |
| :--- | :--- | :--- |
| Loading | Synchronous | Asynchronous |
| `import` | Evaluated when `require` runs | **Hoisted** (resolved beforehand) |
| Top-level `this` | `module.exports` | `undefined` |
| Top-level await | ❌ No | ✅ Yes (Node 14+, browsers) |
| `__dirname` | ✅ Yes | ❌ No (use `import.meta.url`) |
| Tree-shaking | ❌ Hard | ✅ Yes (static) |

---

## 🛠 What is a Bundler?

A **bundler** takes all your modules and dependencies and **packages** them into one or a few files that the browser can load.

### What Does It Do Exactly?

1. **Resolves imports**: knows where `./utils` or `react` lives.
2. **Transpiles**: converts TS, JSX, SCSS into JS/CSS.
3. **Optimizes**: minifies, removes dead code (tree-shaking).
4. **Bundles**: generates `dist/main.js` ready for production.
5. **Emits assets**: copies images, fonts, etc.
6. **HMR** (optional): hot module replacement on save.

~~~mermaid
graph LR
    A[main.js] --> B[Bundler]
    C[utils.js] --> B
    D[styles.css] --> B
    E[imagen.png] --> B
    B --> F[dist/main.hash.js]
    B --> G[dist/style.hash.css]
    B --> H[dist/imagen.hash.png]
~~~

!!! warning "What about no bundler?"
    You can use native ESM with `<script type="module">` and skip a bundler. However:
    - Every file is an extra HTTP request.
    - No tree-shaking.
    - You can't use TypeScript, JSX, or SCSS without transpiling.
    - No minification.

    For small projects it works fine. For large apps, a bundler is almost mandatory.

---

## 🚀 Modern Bundlers

| Bundler | Speed | Config | Best for |
| :--- | :--- | :--- | :--- |
| **Vite** | ⚡ Very fast (esbuild + Rollup) | Minimal | SPAs, React, Vue, Svelte, Vanilla |
| **esbuild** | ⚡ Fastest (Go) | Minimal | Libraries, CLIs, fast builds |
| **Rollup** | 🚀 Fast | Medium | Libraries (best tree-shaking) |
| **webpack** | 🐢 Slow | High | Legacy, very specific cases |
| **Parcel** | 🚀 Fast | Zero config | Prototypes, simple projects |
| **Rspack / Turbopack** | ⚡ Very fast | Low | Modern webpack alternatives |

!!! tip "2026 Recommendation"
    - **New app** → **Vite** (or whichever bundler your framework ships with).
    - **Library** → **Rollup** or **tsup** (powered by esbuild).
    - **Legacy webpack** → only if required by the project.

### Vite in 30 Seconds

~~~bash
npm create vite@latest mi-app -- --template react
cd mi-app
npm install
npm run dev
~~~

~~~yaml
# vite.config.js — minimal
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
});
~~~

**Why Vite is fast:**
- **Dev**: serves modules unbundled (using native browser ESM). Millisecond startup.
- **Build**: uses Rollup for production (optimal tree-shaking).
- **HMR**: only reloads the changed module, not the whole page.

---

## 📦 Tree-shaking

**Tree-shaking** = removing unused code. The bundler analyzes which imports are actually used and drops the rest.

~~~javascript
// utils.js
export function sumar(a, b) { return a + b; }
export function restar(a, b) { return a - b; }
export function multiplicar(a, b) { return a * b; }

// main.js
import { sumar } from "./utils.js";
console.log(sumar(2, 3));
// restar and multiplicar are removed from the bundle
~~~

**Requirements:**
- ESM (bundlers cannot tree-shake CommonJS).
- No side effects (`sideEffects: false` in `package.json`).
- Pure functions (without mutating global state).

!!! warning "The enemy of tree-shaking"
    `import * as utils from "./utils"` prevents tree-shaking (it imports everything). Use `import { sumar } from "./utils"`. And avoid hidden side effects (such as modifying `window` on import).

---

## 🧩 Code Splitting

**Code splitting** = splitting the bundle into chunks loaded **on demand**.

~~~javascript
// ❌ Everything in the main bundle
import { Chart } from "chart.js";

// ✅ Load only when needed
button.addEventListener("click", async () => {
    const { Chart } = await import("chart.js");
    new Chart(ctx, config);
});
~~~

**When to split:**
- Routes (lazy loading per page).
- Heavy modals and components.
- Large libraries (chart.js, monaco, mapbox).
- Features not every user uses.

**Vite/Rollup** does this automatically with dynamic `import()` and generates separate chunks.

~~~javascript
// React.lazy (React)
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {
    return (
        <Suspense fallback={<p>Cargando…</p>}>
            <Dashboard />
        </Suspense>
    );
}
~~~

---

## 🌐 ESM in the Browser (No Bundler)

~~~html
<script type="module" src="/main.js"></script>
~~~

~~~javascript
// main.js
import { sumar } from "./utils.js";
console.log(sumar(2, 3));
~~~

**Pros:**
- Zero configuration.
- Works in all modern browsers.
- Great for small projects or prototypes.

**Cons:**
- Each file = 1 HTTP request.
- No tree-shaking or minification.
- No transpilation (TS, JSX don't run directly).

!!! tip "The middle ground"
    For a 3-page site, native ESM is enough. For an SPA with 50 components and TypeScript, you need a bundler.

---

## 🏗 Example: Comparing Bundles

| Project | Without bundler | With Vite (build) |
| :--- | :--- | :--- |
| 10 JS files, 50 KB total | 10 requests, unminified | 1 file, ~20 KB minified |
| 50 React components | Impossible without transpiling | 1 bundle + chunks, tree-shaking |
| 100 npm libraries | Impossible (no `node_modules` in browser) | 1 bundle with everything resolved |

---

## 🧪 Practical Exercise

!!! example "Create a project with Vite"
    Create a vanilla project with Vite that:

    - Displays "Hola, Vite" in the DOM.
    - Imports a `saludar(nombre)` function from `./saludar.js`.
    - Has HMR working (when you change the text, it updates).

    Follow these steps:
    1. `npm create vite@latest mi-vite -- --template vanilla`
    2. `cd mi-vite && npm install`
    3. Create `saludar.js` with `export function saludar(n) { return "Hola, " + n; }`
    4. Import it in `main.js` and display the result.
    5. Run `npm run dev` and test HMR.

??? success "Solution"
    ~~~javascript
    // saludar.js
    export function saludar(nombre) {
        return `Hola, ${nombre}`;
    }
    ~~~

    ~~~javascript
    // main.js
    import "./style.css";
    import { saludar } from "./saludar.js";

    document.querySelector("#app").innerHTML = `
        <h1>${saludar("Vite")}</h1>
    `;
    ~~~

    **HMR:** with `npm run dev`, when you edit `saludar.js` or `main.js`, the browser updates without reloading the page.

---

## 🧠 Quiz

!!! question "Check what you learned"

??? success "1. What is the difference between CommonJS and ESM?"
    CommonJS uses `require` and `module.exports`, is synchronous, and belongs to classic Node.js. ESM uses `import` and `export`, is asynchronous, hoists imports, and supports top-level await and tree-shaking.

??? success "2. What does a bundler do?"
    Resolves imports, transpiles (TS, JSX, SCSS), minifies, performs tree-shaking, bundles into one or a few files, and copies assets.

??? success "3. Why is Vite so fast in development?"
    Because it serves modules unbundled using native browser ESM. It only bundles for production builds (with Rollup).

??? success "4. What is tree-shaking?"
    Removing unused code from the final bundle. It requires ESM and pure functions without side effects.

??? success "5. What is code splitting?"
    Splitting the bundle into chunks loaded on demand (via dynamic `import()`), reducing initial load time.

---

## 📚 Resources

- [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Vite — Docs](https://vite.dev/)
- [Rollup — Docs](https://rollupjs.org/)
- [esbuild — Docs](https://esbuild.github.io/)
- [webpack — Docs](https://webpack.js.org/)
- [Node.js — ESM](https://nodejs.org/api/esm.html)
- [web.dev — Reduce JavaScript payloads](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

➡ Next chapter: [14 — Accesibilidad](14-accesibilidad.md)


---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-13">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which module system uses import/export?</p>
<button class="quiz-option" data-opt="a">A) CommonJS</button>
<button class="quiz-option" data-opt="b">B) ES Modules</button>
<button class="quiz-option" data-opt="c">C) AMD</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> Which bundler is fastest in development?</p>
<button class="quiz-option" data-opt="a">A) webpack</button>
<button class="quiz-option" data-opt="b">B) Vite</button>
<button class="quiz-option" data-opt="c">C) Rollup</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> What is tree-shaking?</p>
<button class="quiz-option" data-opt="a">A) Removing unused code</button>
<button class="quiz-option" data-opt="b">B) Minifying the code</button>
<button class="quiz-option" data-opt="c">C) Splitting the bundle</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2013%3A%20Modules%20and%20Bundlers&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F13-modulos-bundlers%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F13-modulos-bundlers%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/13-modulos-bundlers/" aria-label="Copy link">Copy link</button>
</div>