# Capítulo 15 — TypeScript desde cero

## Introducción

**TypeScript** es un superset de JavaScript que añade **tipado estático** al lenguaje. Todo código JavaScript válido es también TypeScript válido, pero TypeScript te avisa de errores **antes de ejecutar** el código.

Lo usan Angular, NestJS, Deno, VS Code, Slack y prácticamente cualquier proyecto frontend serio hoy.

## ¿Por qué TypeScript?

### Sin TypeScript

```javascript
function sumar(a, b) {
  return a + b;
}

sumar(2, 3);        // 5
sumar('2', 3);      // '23' 😱
sumar([], {});      // ??? 💥
```

Los errores aparecen en **runtime**, en producción, delante del usuario.

### Con TypeScript

```typescript
function sumar(a: number, b: number): number {
  return a + b;
}

sumar(2, 3);        // 5
sumar('2', 3);      // ❌ Error antes de ejecutar
```

Los errores aparecen en **tiempo de compilación**, en el editor, mientras escribes.

### Ventajas concretas

- **Autocompletado real** en el editor.
- **Detección temprana de errores**.
- **Refactorización segura**.
- **Documentación viva** de tu código.
- **Mejor experiencia** en equipos grandes.

## Instalación

```bash
npm install -D typescript
npx tsc --init
```

Se crea `tsconfig.json`, la configuración del compilador.

### `tsconfig.json` recomendado

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

!!! tip "Modo `strict`"
    Activa siempre `"strict": true`. Es más molesto al principio, pero evita miles de bugs. Puedes desactivar reglas concretas si lo necesitas.

### Compilar

```bash
npx tsc archivo.ts           # genera archivo.js
npx tsc --watch              # recompila al guardar
npx tsc --noEmit             # solo comprueba tipos (ideal para CI)
```

## Tipos básicos

```typescript
let nombre: string = 'Urukais';
let edad: number = 30;
let activo: boolean = true;
let nada: null = null;
let indefinido: undefined = undefined;

let numeros: number[] = [1, 2, 3];
let tupla: [string, number] = ['edad', 30];

let cualquiera: any = 'cuidado con esto';

let desconocido: unknown = 'algo'; // más seguro que any
```

### Diferencia entre `any` y `unknown`

- `any` desactiva el chequeo. **Evítalo**.
- `unknown` obliga a verificar el tipo antes de usarlo.

```typescript
function procesar(valor: unknown) {
  if (typeof valor === 'string') {
    console.log(valor.toUpperCase()); // ✅
  }
}
```

## Inferencia de tipos

TypeScript casi siempre **deduce** el tipo por ti:

```typescript
let nombre = 'Urukais';        // infiere: string
let edad = 30;                 // infiere: number
const activo = true;           // infiere: true (literal)
```

No hace falta anotar todo. Solo cuando el tipo no es evidente.

## Funciones

```typescript
function saludar(nombre: string): string {
  return `Hola, ${nombre}`;
}

// Parámetros opcionales
function crearUsuario(nombre: string, email?: string) {
  // email es string | undefined
}

// Parámetros por defecto
function crear(nombre: string, rol: string = 'usuario') {}

// Arrow functions
const sumar = (a: number, b: number): number => a + b;
```

## Objetos e interfaces

### Interface

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad?: number;       // opcional
  readonly creado: Date; // no se puede modificar
}

const user: Usuario = {
  id: 1,
  nombre: 'Urukais',
  email: 'hola@ejemplo.com',
  creado: new Date(),
};
```

### Type

```typescript
type Estado = 'pendiente' | 'activo' | 'cancelado';

type Punto = {
  x: number;
  y: number;
};
```

!!! info "Interface vs Type"
    - **Interface**: extensible, ideal para objetos y clases.
    - **Type**: más flexible, permite uniones, intersecciones y tuplas.
    
    Regla práctica: usa `interface` para objetos, `type` para lo demás.

## Uniones e intersecciones

```typescript
// Unión: uno u otro
type ID = string | number;

function buscar(id: ID) {
  // id puede ser string o number
}

// Intersección: todo a la vez
type Persona = { nombre: string };
type Trabajador = { empresa: string };
type Empleado = Persona & Trabajador;
```

## Narrowing (estrechamiento de tipos)

TypeScript reduce el tipo según el contexto:

```typescript
function longitud(valor: string | string[]): number {
  if (typeof valor === 'string') {
    return valor.length;      // aquí valor es string
  }
  return valor.length;        // aquí valor es string[]
}
```

Otras formas de narrowing:

- `typeof x === 'number'`
- `x instanceof Fecha`
- `'propiedad' in objeto`
- `Array.isArray(x)`

## Genéricos

Permiten escribir código que funciona con **cualquier tipo** sin perder información.

```typescript
function primero<T>(array: T[]): T | undefined {
  return array[0];
}

primero([1, 2, 3]);              // number
primero(['a', 'b']);             // string
primero([{ id: 1 }]);            // { id: number }
```

### Con restricciones

```typescript
function claveDe<T, K extends keyof T>(obj: T, clave: K): T[K] {
  return obj[clave];
}

const user = { nombre: 'Urukais', edad: 30 };
claveDe(user, 'nombre');   // string
claveDe(user, 'edad');     // number
// claveDe(user, 'xxx');   // ❌ error
```

## Utility types

TypeScript incluye tipos auxiliares muy útiles:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

Partial<Usuario>      // todas las props opcionales
Required<Usuario>     // todas obligatorias
Readonly<Usuario>     // todas readonly
Pick<Usuario, 'id' | 'nombre'>  // solo esas props
Omit<Usuario, 'id'>             // todas menos esas
Record<string, number>          // objeto con claves string y valores number
ReturnType<typeof fn>           // el tipo que devuelve fn
Parameters<typeof fn>           // los tipos de sus parámetros
```

Ejemplo real:

```typescript
function actualizarUsuario(id: number, cambios: Partial<Usuario>) {
  // cambios puede tener solo algunos campos
}
```

## Clases

```typescript
class Cuenta {
  private saldo: number = 0;

  constructor(
    public readonly titular: string,
    private readonly id: string,
  ) {}

  depositar(cantidad: number): void {
    if (cantidad <= 0) throw new Error('Cantidad inválida');
    this.saldo += cantidad;
  }

  get balance(): number {
    return this.saldo;
  }
}
```

Modificadores:

- `public`: accesible desde cualquier lugar (por defecto).
- `private`: solo desde la propia clase.
- `protected`: desde la clase y sus subclases.
- `readonly`: no modificable tras el constructor.

## Tipos literales y enums

```typescript
type Talla = 'S' | 'M' | 'L' | 'XL';

function vestir(talla: Talla) {}

vestir('M');   // ✅
vestir('XXL'); // ❌
```

Enums (usa con moderación):

```typescript
enum Estado {
  Pendiente = 'pendiente',
  Activo = 'activo',
  Cancelado = 'cancelado',
}

const estado: Estado = Estado.Activo;
```

## Funciones asíncronas

```typescript
async function obtenerUsuario(id: number): Promise<Usuario> {
  const res = await fetch(`/api/usuarios/${id}`);
  if (!res.ok) throw new Error('No encontrado');
  return await res.json();
}
```

## TypeScript con librerías

La mayoría de librerías traen tipos incluidos. Otras necesitan `@types/nombre`:

```bash
npm install -D @types/node
npm install -D @types/lodash
```

Si una librería no tiene tipos, puedes declararlos:

```typescript
// src/types/libreria-rara.d.ts
declare module 'libreria-rara' {
  export function hacerAlgo(x: number): string;
}
```

## Ejemplo real: función tipada de API

```typescript
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

async function obtenerPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function titulos(posts: Post[]): string[] {
  return posts.map(p => p.title);
}
```

## Buenas prácticas

- **Activa `strict: true`** siempre.
- **Evita `any`**. Usa `unknown` cuando no sepas el tipo.
- **Prefiere interfaces para objetos públicos** y types para uniones.
- **Usa `readonly`** en propiedades que no deben cambiar.
- **Aprovecha la inferencia**. No anotes lo evidente.
- **Tipa las funciones públicas**. Los parámetros y el retorno.
- **Documenta los tipos complejos** con comentarios.
- **Ejecuta `tsc --noEmit` en CI** para detectar errores.
- **Migra JavaScript a TypeScript por módulos**, no todo de golpe.

## Ejercicios

1. Convierte una función JavaScript sin tipos a TypeScript con parámetros y retorno tipados.
2. Crea una interface `Producto` con `id`, `nombre`, `precio` y `categorias` (array).
3. Escribe una función genérica `ultimo<T>(array: T[]): T | undefined`.
4. Define un type unión `Resultado` con `{ ok: true; datos: string }` y `{ ok: false; error: string }`.
5. Usa `Partial<Producto>` para escribir una función `actualizarProducto`.
6. Escribe una clase `Carrito` con métodos `añadir`, `total` y `vaciar`, todo tipado.
7. Refactoriza un archivo JavaScript de tus ejercicios anteriores a TypeScript con `strict`.

---

⬅️ [Capítulo 14 — Accesibilidad web](14-accesibilidad.md) | ➡️ [Capítulo 16 — Testing frontend](16-testing.md)
---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz-container" data-correct="a">
  <p class="quiz-question">¿Cuál es la principal ventaja de TypeScript frente a JavaScript?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) El tipado estático, que detecta errores antes de ejecutar</button>
    <button class="quiz-option" data-option="b">B) Que es más rápido en el navegador</button>
    <button class="quiz-option" data-option="c">C) Que no necesita compilación</button>
  </div>
  <div class="quiz-feedback"></div>
</div>

<div class="quiz-container" data-correct="b">
  <p class="quiz-question">¿Qué tipo de TypeScript se usa para indicar que una variable puede ser de un tipo u otro?</p>
  <div class="quiz-options">
    <button class="quiz-option" data-option="a">A) type intersection (&amp;)</button>
    <button class="quiz-option" data-option="b">B) type union (|)</button>
    <button class="quiz-option" data-option="c">C) any</button>
  </div>
  <div class="quiz-feedback"></div>
</div>