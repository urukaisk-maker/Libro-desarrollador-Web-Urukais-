# 13 — Módulos y bundlers

!!! abstract "Qué vas a aprender"
    - Qué son los módulos y por qué existen.
    - Módulos ES6 (import/export).

    - Qué hace un bundler y por qué lo necesitas.
    - Vite, Webpack y esbuild.
    - Code splitting y tree shaking.

---

## 📦 ¿Qué es un módulo?

Un **módulo** es un archivo que encapsula código y expone solo lo que quiere compartir.

```javascript
// math.js
export function sumar(a, b) {
  return a + b;
}

export const PI = 3.1416;

// app.js
import { sumar, PI } from "./math.js";
console.log(sumar(2, 3)); // 5
```

!!! quote "Divide y vencerás"
    Los módulos permiten que varios desarrolladores trabajen en paralelo sin pisarse.

---

## 📤 Módulos ES6

### Exportar

```javascript
export const nombre = "Ana";
export function saludar() { return "Hola"; }
export default function principal() { }
```

### Importar

```javascript
import { nombre, saludar } from "./modulo.js";
import principal from "./modulo.js";
import * as modulo from "./modulo.js";
```

### En HTML

```html
<script type="module" src="app.js"></script>
```

!!! warning "Los módulos tienen scope propio"
    Las variables de un módulo no son globales.

---

## 🔧 ¿Qué es un bundler?

Un **bundler** empaqueta todos tus módulos en uno o varios archivos optimizados.

### ¿Por qué necesitas un bundler?

1. **Compatibilidad**: las dependencias de npm suelen estar en otros formatos.
2. **Rendimiento**: un solo archivo es más rápido que 50 pequeños.
3. **Optimización**: minificación, tree shaking.
4. **Assets**: procesa CSS, imágenes, fuentes.

---

## ⚡ Vite

**Vite** es el bundler moderno más popular. Usa ES modules nativos en desarrollo y Rollup en producción.

```bash
npm create vite@latest mi-app -- --template vanilla
cd mi-app
npm install
npm run dev
npm run build
```

### vite.config.js

```javascript
import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 3000, open: true },
  build: { outDir: "dist", sourcemap: true },
});
```

!!! tip "Vite es ultrarrápido"
    En desarrollo, Vite no empaqueta: sirve los módulos directamente al navegador.

---

## 📦 Webpack

**Webpack** es el bundler clásico. Muy potente pero más complejo de configurar.

```javascript
module.exports = {
  entry: "./src/index.js",
  output: { filename: "bundle.js", path: __dirname + "/dist" },
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
};
```

---

## 🪶 esbuild

**esbuild** es un bundler escrito en Go, **extremadamente rápido**.

```bash
npm install esbuild
npx esbuild app.js --bundle --outfile=out.js --minify
```

---

## 🌳 Tree shaking

**Tree shaking** elimina el código que no se usa.

```javascript
// modulo.js
export function usada() { }
export function noUsada() { }

// app.js
import { usada } from "./modulo.js";
usada();
// noUsada() se elimina del bundle
```

---

## ✂️ Code splitting

**Code splitting** divide el bundle en trozos que se cargan **bajo demanda**.

```javascript
document.getElementById("btn").addEventListener("click", async () => {
  const { abrirModal } = await import("./modal.js");
  abrirModal();
});
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-13">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué palabra se usa para exportar en módulos ES6?</p>
<button class="quiz-option" data-opt="a">A) module.exports</button>
<button class="quiz-option" data-opt="b">B) export</button>
<button class="quiz-option" data-opt="c">C) public</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué bundler es el más rápido?</p>
<button class="quiz-option" data-opt="a">A) esbuild</button>
<button class="quiz-option" data-opt="b">B) Webpack</button>
<button class="quiz-option" data-opt="c">C) Parcel</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué técnica elimina el código no usado?</p>
<button class="quiz-option" data-opt="a">A) Code splitting</button>
<button class="quiz-option" data-opt="b">B) Minificación</button>
<button class="quiz-option" data-opt="c">C) Tree shaking</button>
</div>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 14 — Accesibilidad web](14-accesibilidad.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
