# 15 — TypeScript desde cero

!!! abstract "Qué vas a aprender"
    - Qué es TypeScript y por qué usarlo.
    - Tipos básicos y anotaciones.
    - Interfaces y tipos personalizados.
    - Genéricos.
    - Configuración de tsconfig.json.

---

## 🔷 ¿Qué es TypeScript?

**TypeScript** es un superconjunto de JavaScript que añade **tipos estáticos**. El código se compila a JavaScript puro antes de ejecutarse en el navegador o en Node.js.

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

sumar(2, 3);      // OK
sumar("2", "3");  // Error de tipo
```

!!! quote "Los tipos son documentación que no miente"
    Un tipo mal escrito no llega a producción: el compilador te avisa antes. Eso ahorra horas de debugging.

---

## 🎯 ¿Por qué usar TypeScript?

| Ventaja | Descripción |
| :--- | :--- |
| **Detección temprana de errores** | El compilador avisa antes de ejecutar. |
| **Autocompletado** | El editor sabe qué propiedades tiene cada objeto. |
| **Refactorización segura** | Cambiar un tipo avisa de todos los sitios afectados. |
| **Documentación viva** | Los tipos documentan la intención del código. |
| **Mejor trabajo en equipo** | Los contratos entre módulos son explícitos. |

---

## 📦 Tipos básicos

```typescript
// Primitivos
let nombre: string = "Ana";
let edad: number = 30;
let activo: boolean = true;

// Arrays
let numeros: number[] = [1, 2, 3];
let nombres: Array<string> = ["Ana", "Luis"];

// Tuplas
let coordenadas: [number, number] = [40.4, -3.7];

// Any (evitar)
let cualquiera: any = "puede ser cualquier cosa";

// Unknown (más seguro que any)
let desconocido: unknown = obtenerAlgo();

// Void (funciones sin retorno)
function log(mensaje: string): void {
  console.log(mensaje);
}

// Null y undefined
let nulo: null = null;
let indefinido: undefined = undefined;
```

---

## 🏗️ Interfaces y tipos

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number; // opcional
}

const usuario: Usuario = {
  id: 1,
  nombre: "Ana",
  email: "ana@ejemplo.com"
};
```

### Type vs interface

```typescript
// Con type
type Punto = {
  x: number;
  y: number;
};

// Con interface (extensible)
interface PuntoConZ extends Punto {
  z: number;
}
```

!!! tip "type o interface"
    Usa interface para objetos que pueden extenderse. Usa type para uniones, intersecciones y alias de tipos primitivos.

---

## 🔀 Uniones e intersecciones

```typescript
// Unión: puede ser uno u otro
type Estado = "pendiente" | "en-progreso" | "completado";

let tarea: Estado = "pendiente";
tarea = "completado"; // OK
tarea = "cancelado"; // Error

// Intersección: debe tener ambos
type Persona = { nombre: string };
type Trabajador = { empresa: string };
type Empleado = Persona & Trabajador;
```

---

## 🧬 Genéricos

Los **genéricos** permiten escribir funciones y tipos que funcionan con cualquier tipo, manteniendo la seguridad.

```typescript
function identidad<T>(valor: T): T {
  return valor;
}

identidad<string>("hola");  // string
identidad<number>(42);      // number
identidad(true);            // boolean (inferido)
```

### Genéricos en interfaces

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

## ⚙️ tsconfig.json

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
    Activa `strict: true` desde el primer día. Es más estricto, pero te ahorra bugs. Puedes relajarlo después si es necesario.

---

## 🔄 TypeScript en la práctica

### Con Vite

```bash
npm create vite@latest mi-app -- --template vanilla-ts
cd mi-app
npm install
npm run dev
```

### Con Node.js

```bash
npm install -D typescript @types/node tsx
npx tsc --init
npx tsx src/index.ts
```

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-15">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué añade TypeScript a JavaScript?</p>
<button class="quiz-option" data-opt="a">A) Nuevas funciones de runtime</button>
<button class="quiz-option" data-opt="b">B) Tipos estáticos</button>
<button class="quiz-option" data-opt="c">C) Un nuevo motor de JavaScript</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué palabra clave permite crear tipos genéricos?</p>
<button class="quiz-option" data-opt="a">A) &lt;T&gt;</button>
<button class="quiz-option" data-opt="b">B) generic</button>
<button class="quiz-option" data-opt="c">C) template</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué opción de tsconfig activa el modo estricto?</p>
<button class="quiz-option" data-opt="a">A) "mode": "strict"</button>
<button class="quiz-option" data-opt="b">B) "types": "strict"</button>
<button class="quiz-option" data-opt="c">C) "strict": true</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2015%3A%20TypeScript%20desde%20cero&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F15-typescript%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F15-typescript%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2015%3A%20TypeScript%20desde%20cero%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F15-typescript%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/15-typescript/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 16 — Testing frontend](16-testing.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
