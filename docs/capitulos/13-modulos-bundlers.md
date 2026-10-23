# 13 — Módulos y Bundlers

!!! abstract "Qué vas a aprender"
    - Por qué existen los módulos en JavaScript.
    - Diferencias entre CommonJS, ESM, UMD y AMD.
    - Qué es un bundler y qué problema resuelve.
    - Los bundlers modernos: Vite, esbuild, Rollup, webpack.
    - Cuándo usar bundler y cuándo no.

---

## 📦 El problema de los módulos

En 1995, JavaScript no tenía módulos. Todo el código vivía en el **scope global**, y cualquier variable podía chocar con otra.

~~~html
<script src="a.js"></script>
<script src="b.js"></script>
<!-- Si a.js y b.js definen "contador", se pisan -->
~~~

Los **módulos** resuelven esto: cada archivo tiene su propio scope, exporta lo que quiere y otro archivo lo importa explícitamente.

!!! quote "La analogía de las cajas"
    Sin módulos, todo tu código está **tirado en el suelo** del salón: cualquiera puede pisarlo, moverlo o confundirlo. Con módulos, cada cosa tiene su **caja etiquetada**, y solo abres la caja que necesitas.

~~~mermaid
graph LR
    A[main.js] -->|importa| B[math.js]
    A -->|importa| C[ui.js]
    C -->|importa| D[api.js]
    B -.exporta.-> A
    C -.exporta.-> A
    D -.exporta.-> C
~~~

---

## 🏛 Sistemas de módulos

| Sistema | Cuándo | Sintaxis | Entorno |
| :--- | :--- | :--- | :--- |
| **CommonJS (CJS)** | 2009 | `require` / `module.exports` | Node.js clásico |
| **ES Modules (ESM)** | 2015 (ES6) | `import` / `export` | Node.js moderno, navegadores |
| **UMD** | 2011 | `define(...)` o global | Librerías universales |
| **AMD** | 2010 | `define(...)` | Legacy (RequireJS) |

### CommonJS (Node clásico)

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

### ES Modules (estándar moderno)

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

!!! tip "ESM es el futuro (y el presente)"
    Todos los navegadores modernos soportan ESM nativamente (`<script type="module">`). Node.js también desde v12+. Usa ESM en proyectos nuevos.

### Diferencias clave

| Aspecto | CommonJS | ESM |
| :--- | :--- | :--- |
| Carga | Síncrona | Asíncrona |
| `import` | Se evalúa al ejecutar `require` | Se **hoistea** (se resuelve antes) |
| `this` en top-level | `module.exports` | `undefined` |
| Top-level await | ❌ No | ✅ Sí (Node 14+, navegadores) |
| `__dirname` | ✅ Sí | ❌ No (usar `import.meta.url`) |
| Tree-shaking | ❌ Difícil | ✅ Sí (estático) |

---

## 🛠 ¿Qué es un bundler?

Un **bundler** toma todos tus módulos y dependencias, y los **empaqueta** en uno o pocos archivos que el navegador pueda cargar.

### ¿Qué hace exactamente?

1. **Resuelve imports**: sabe dónde está `./utils` o `react`.
2. **Transpila**: convierte TS, JSX, SCSS a JS/CSS.
3. **Optimiza**: minifica, elimina código muerto (tree-shaking).
4. **Empaqueta**: genera `dist/main.js` listo para producción.
5. **Genera assets**: copia imágenes, fuentes, etc.
6. **HMR** (opcional): recarga en caliente al guardar.

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

!!! warning "¿Y sin bundler?"
    Puedes usar ESM nativo con `<script type="module">` y no tener bundler. Pero entonces:
    - Cada archivo es una petición HTTP extra.
    - No hay tree-shaking.
    - No puedes usar TypeScript, JSX ni SCSS sin transpilar.
    - No hay minificación.
    
    Para proyectos pequeños es viable. Para apps grandes, un bundler es casi obligatorio.

---

## 🚀 Bundlers modernos

| Bundler | Velocidad | Configuración | Ideal para |
| :--- | :--- | :--- | :--- |
| **Vite** | ⚡ Muy rápido (esbuild + Rollup) | Mínima | SPAs, React, Vue, Svelte, Vanilla |
| **esbuild** | ⚡ El más rápido (Go) | Mínima | Librerías, CLIs, builds rápidos |
| **Rollup** | 🚀 Rápido | Media | Librerías (mejor tree-shaking) |
| **webpack** | 🐢 Lento | Alta | Legacy, casos muy específicos |
| **Parcel** | 🚀 Rápido | Cero config | Prototipos, proyectos simples |
| **Rspack / Turbopack** | ⚡ Muy rápido | Baja | Alternativas modernas a webpack |

!!! tip "Recomendación 2026"
    - **App nueva** → **Vite** (o el bundler que traiga tu framework).
    - **Librería** → **Rollup** o **tsup** (basado en esbuild).
    - **Legacy webpack** → solo si lo exige el proyecto.

### Vite en 30 segundos

~~~bash
npm create vite@latest mi-app -- --template react
cd mi-app
npm install
npm run dev
~~~

~~~yaml
# vite.config.js — mínimo
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
});
~~~

**Por qué Vite es rápido:**
- **Dev**: sirve los módulos sin empaquetar (usando ESM nativo del navegador). Arranque en milisegundos.
- **Build**: usa Rollup para producción (óptimo tree-shaking).
- **HMR**: solo recarga el módulo cambiado, no la página entera.

---

## 📦 Tree-shaking

**Tree-shaking** = eliminar el código que no se usa. El bundler analiza qué imports se usan realmente y descarta el resto.

~~~javascript
// utils.js
export function sumar(a, b) { return a + b; }
export function restar(a, b) { return a - b; }
export function multiplicar(a, b) { return a * b; }

// main.js
import { sumar } from "./utils.js";
console.log(sumar(2, 3));
// restar y multiplicar se eliminan del bundle
~~~

**Requisitos:**
- ESM (los bundlers no pueden hacer tree-shaking de CommonJS).
- Sin efectos secundarios (`sideEffects: false` en `package.json`).
- Funciones puras (sin modificar estado global).

!!! warning "El enemigo del tree-shaking"
    `import * as utils from "./utils"` impide el tree-shaking (importa todo). Usa `import { sumar } from "./utils"`. Y evita los efectos secundarios ocultos (como modificar `window` al importar).

---

## 🧩 Code splitting

**Code splitting** = dividir el bundle en trozos que se cargan **bajo demanda**.

~~~javascript
// ❌ Todo en el bundle principal
import { Chart } from "chart.js";

// ✅ Carga solo cuando se necesita
button.addEventListener("click", async () => {
    const { Chart } = await import("chart.js");
    new Chart(ctx, config);
});
~~~

**Cuándo dividir:**
- Rutas (lazy loading por página).
- Modales y componentes pesados.
- Librerías grandes (chart.js, monaco, mapbox).
- Funcionalidades que no todos los usuarios usan.

**Vite/Rollup** lo hace automáticamente con `import()` dinámico y genera chunks separados.

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

## 🌐 ESM en el navegador (sin bundler)

~~~html
<script type="module" src="/main.js"></script>
~~~

~~~javascript
// main.js
import { sumar } from "./utils.js";
console.log(sumar(2, 3));
~~~

**Ventajas:**
- Cero configuración.
- Funciona en todos los navegadores modernos.
- Ideal para proyectos pequeños o prototipos.

**Desventajas:**
- Cada archivo = 1 petición HTTP.
- Sin tree-shaking ni minificación.
- Sin transpilación (TS, JSX no funcionan directamente).

!!! tip "El punto medio"
    Para una web de 3 páginas, ESM nativo es suficiente. Para una SPA con 50 componentes y TypeScript, necesitas bundler.

---

## 🏗 Ejemplo: comparar bundles

| Proyecto | Sin bundler | Con Vite (build) |
| :--- | :--- | :--- |
| 10 archivos JS, 50 KB total | 10 peticiones, sin minificar | 1 archivo, ~20 KB minificado |
| 50 componentes React | Imposible sin transpilar | 1 bundle + chunks, tree-shaking |
| 100 librerías npm | Imposible (no hay `node_modules` en navegador) | 1 bundle con todo resuelto |

---

## 🧪 Ejercicio práctico

!!! example "Crear un proyecto con Vite"
    Crea un proyecto vanilla con Vite que:

    - Muestre "Hola, Vite" en el DOM.
    - Importe una función `saludar(nombre)` desde `./saludar.js`.
    - Tenga HMR funcionando (al cambiar el texto, se recarga).

    Sigue estos pasos:
    1. `npm create vite@latest mi-vite -- --template vanilla`
    2. `cd mi-vite && npm install`
    3. Crea `saludar.js` con `export function saludar(n) { return "Hola, " + n; }`
    4. Importa en `main.js` y muestra el resultado.
    5. `npm run dev` y comprueba HMR.

??? success "Solución"
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

    **HMR:** con `npm run dev`, al editar `saludar.js` o `main.js`, el navegador actualiza sin recargar la página.

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué diferencia hay entre CommonJS y ESM?"
    CommonJS usa `require` y `module.exports`, es síncrono, de Node.js clásico. ESM usa `import` y `export`, es asíncrono, hoistea imports, permite top-level await y tree-shaking.

??? success "2. ¿Qué hace un bundler?"
    Resuelve imports, transpila (TS, JSX, SCSS), minifica, hace tree-shaking, empaqueta en uno o pocos archivos y copia assets.

??? success "3. ¿Por qué Vite es tan rápido en desarrollo?"
    Porque sirve los módulos sin empaquetar, usando ESM nativo del navegador. Solo empaqueta en build de producción (con Rollup).

??? success "4. ¿Qué es tree-shaking?"
    Eliminar el código que no se usa del bundle final. Requiere ESM y funciones puras sin efectos secundarios.

??? success "5. ¿Qué es code splitting?"
    Dividir el bundle en chunks que se cargan bajo demanda (con `import()` dinámico), reduciendo el tiempo de carga inicial.

---

## 📚 Recursos

- [MDN — JavaScript modules](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Modules)
- [Vite — Docs](https://vite.dev/)
- [Rollup — Docs](https://rollupjs.org/)
- [esbuild — Docs](https://esbuild.github.io/)
- [webpack — Docs](https://webpack.js.org/)
- [Node.js — ESM](https://nodejs.org/api/esm.html)
- [web.dev — Reduce JavaScript payloads](https://web.dev/reduce-javascript-payloads-with-code-splitting/)

---

➡️ Siguiente capítulo: [14 — Accesibilidad](14-accesibilidad.md)