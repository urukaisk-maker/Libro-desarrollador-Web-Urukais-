---
description: "Chapter 15 of the Web Developer's Book: 15 — TypeScript from Scratch. Learn step by step with examples, exercises, and quizzes."
---
# 15 — TypeScript from Scratch

!!! abstract "What you will learn"
    - What TypeScript is and why to use it.
    - Basic types and annotations.
    - Interfaces and custom types.
    - Generics.
    - Configuring tsconfig.json.

---

## 🔷 What is TypeScript?

**TypeScript** is a superset of JavaScript that adds **static types**. The code compiles to plain JavaScript before running in the browser or in Node.js.

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

sumar(2, 3);      // OK
sumar("2", "3");  // Type error
```

!!! quote "Types are documentation that doesn't lie"
    A mistyped value never reaches production: the compiler warns you first. That saves hours of debugging.

---

## 🎯 Why Use TypeScript?

| Benefit | Description |
| :--- | :--- |
| **Early error detection** | The compiler warns before execution. |
| **Autocomplete** | The editor knows what properties each object has. |
| **Safe refactoring** | Changing a type flags every affected spot. |
| **Living documentation** | Types document the intent of the code. |
| **Better teamwork** | Contracts between modules are explicit. |

---

## 📦 Basic Types

```typescript
// Primitives
let nombre: string = "Ana";
let edad: number = 30;
let activo: boolean = true;

// Arrays
let numeros: number[] = [1, 2, 3];
let nombres: Array<string> = ["Ana", "Luis"];

// Tuples
let coordenadas: [number, number] = [40.4, -3.7];

// Any (avoid)
let cualquiera: any = "can be anything";

// Unknown (safer than any)
let desconocido: unknown = obtenerAlgo();

// Void (functions with no return)
function log(mensaje: string): void {
  console.log(mensaje);
}

// Null and undefined
let nulo: null = null;
let indefinido: undefined = undefined;
```

---

## 🏗 Interfaces and Types

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number; // optional
}

const usuario: Usuario = {
  id: 1,
  nombre: "Ana",
  email: "ana@ejemplo.com"
};
```

### Type vs. interface

```typescript
// With type
type Punto = {
  x: number;
  y: number;
};

// With interface (extensible)
interface PuntoConZ extends Punto {
  z: number;
}
```

!!! tip "type or interface"
    Use interface for objects that can be extended. Use type for unions, intersections, and primitive type aliases.

---

## 🔀 Unions and Intersections

```typescript
// Union: can be one or the other
type Estado = "pendiente" | "en-progreso" | "completado";

let tarea: Estado = "pendiente";
tarea = "completado"; // OK
tarea = "cancelado"; // Error

// Intersection: must have both
type Persona = { nombre: string };
type Trabajador = { empresa: string };
type Empleado = Persona & Trabajador;
```

---

## 🧬 Generics

**Generics** let you write functions and types that work with any type while preserving type safety.

```typescript
function identidad<T>(valor: T): T {
  return valor;
}

identidad<string>("hola");  // string
identidad<number>(42);      // number
identidad(true);            // boolean (inferred)
```

### Generics in Interfaces

```typescript
interface Respuesta<T> {
  data: T;
  error: string | null;
}

const respuesta: Respuesta<Usuario> = {
  data: { id: 1, nombre: "Ana", email: "ana@ejemplo.com" },
  error: null
};
```

---

## ⚙ tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

!!! tip "strict: true"
    Turn on `strict: true` from day one. It's stricter, but it saves you from bugs. You can relax it later if needed.

---

## 🔄 TypeScript in Practice

### With Vite

```bash
npm create vite@latest mi-app -- --template vanilla-ts
cd mi-app
npm install
npm run dev
```

### With Node.js

```bash
npm install -D typescript @types/node tsx
npx tsc --init
npx tsx src/index.ts
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-15">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What does TypeScript add to JavaScript?</p>
<button class="quiz-option" data-opt="a">A) New runtime functions</button>
<button class="quiz-option" data-opt="b">B) Static types</button>
<button class="quiz-option" data-opt="c">C) A new JavaScript engine</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which keyword creates generic types?</p>
<button class="quiz-option" data-opt="a">A) &lt;T&gt;</button>
<button class="quiz-option" data-opt="b">B) generic</button>
<button class="quiz-option" data-opt="c">C) template</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which tsconfig option enables strict mode?</p>
<button class="quiz-option" data-opt="a">A) "mode": "strict"</button>
<button class="quiz-option" data-opt="b">B) "types": "strict"</button>
<button class="quiz-option" data-opt="c">C) "strict": true</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2015%3A%20TypeScript%20from%20Scratch&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F15-typescript%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F15-typescript%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2015%3A%20TypeScript%20from%20Scratch%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F15-typescript%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/15-typescript/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 16 — Testing frontend](16-testing.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }