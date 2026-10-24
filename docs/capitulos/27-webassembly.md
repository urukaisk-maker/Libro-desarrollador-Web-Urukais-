# 27 — WebAssembly

!!! abstract "Qué vas a aprender"
    - Qué es WebAssembly y por qué existe.
    - Cuándo usarlo y cuándo no.
    - Compilar Rust a Wasm.
    - Integrarlo con JavaScript.
    - Casos de uso reales.

---

## 🧩 ¿Qué es WebAssembly?

**WebAssembly** (Wasm) es un formato binario que permite ejecutar código de **otros lenguajes** (Rust, C, C++, Go…) en el navegador a **velocidad casi nativa**. No sustituye a JavaScript: lo complementa.

```
JavaScript  → rápido, pero no tanto para cálculo intensivo
WebAssembly → velocidad casi nativa para cálculo intensivo
```

!!! quote "Wasm no reemplaza a JS"
    WebAssembly no va a sustituir a JavaScript. Va a convivir con él: JS para la lógica de la app, Wasm para las partes que necesitan máximo rendimiento.

---

## 🎯 ¿Cuándo usar WebAssembly?

| Caso | ¿Wasm? |
| :--- | :--- |
| Vídeo y audio en tiempo real | ✅ |
| Juegos 3D y simulaciones | ✅ |
| Criptografía y compresión | ✅ |
| Edición de imágenes en el navegador | ✅ |
| IA y machine learning | ✅ |
| CRUD de una app web | ❌ |
| Formularios y validaciones | ❌ |
| Animaciones básicas | ❌ |

---

## 🦀 Compilar Rust a WebAssembly

```bash
# Instalar wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Crear proyecto
cargo new --lib mi-wasm
cd mi-wasm
```

```toml
# Cargo.toml
[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

```rust
// src/lib.rs
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sumar(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    if n <= 1 { return n as u64; }
    let mut a = 0;
    let mut b = 1;
    for _ in 2..=n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    b
}
```

```bash
wasm-pack build --target web
```

Esto genera una carpeta `pkg/` con el `.wasm` y los bindings de JavaScript.

---

## 🔗 Integrar con JavaScript

```html
&lt;script type="module"&gt;
  import init, { sumar, fibonacci } from "./pkg/mi_wasm.js";

  await init();
  console.log(sumar(2, 3));      // 5
  console.log(fibonacci(40));    // 102334155 (rápido)
&lt;/script&gt;
```

!!! tip "async init"
    La función `init()` carga y compila el binario `.wasm`. Devuelve una promesa, así que hay que esperar.

---

## ⚡ WebAssembly en el navegador (API nativa)

```javascript
const respuesta = await fetch("modulo.wasm");
const bytes = await respuesta.arrayBuffer();
const { instance } = await WebAssembly.instantiate(bytes);

console.log(instance.exports.sumar(2, 3));
```

La API nativa es más verbose. `wasm-bindgen` (Rust) o `Emscripten` (C/C++) generan los bindings automáticamente.

---

## 🏆 Casos de uso reales

| Empresa | Uso de Wasm |
| :--- | :--- |
| **Figma** | Renderizado y edición de gráficos vectoriales |
| **Google Earth** | Visualización 3D del planeta |
| **AutoCAD Web** | Diseño CAD en el navegador |
| **Photoshop Web** | Edición de imágenes |
| **Zoom** | Procesamiento de vídeo y audio |
| **Unity** | Juegos 3D en el navegador |
| **Pyodide** | Python completo en el navegador |

---

## ⚡ Rendimiento: Wasm vs JS

| Tarea | JavaScript | WebAssembly | Mejora |
| :--- | :--- | :--- | :--- |
| Fibonacci(40) | ~2 s | ~0.4 s | **5x** |
| Compresión gzip | ~1.5 s | ~0.3 s | **5x** |
| Renderizado 3D | ~16 ms/frame | ~4 ms/frame | **4x** |
| Cálculo matricial | ~800 ms | ~100 ms | **8x** |

!!! note "Los números varían"
    Estas cifras son orientativas. Dependen del navegador, del hardware y del tipo de tarea. Para operaciones pequeñas, el coste de cargar el `.wasm` puede hacer que no compense.

---

## 🛠️ Herramientas

| Herramienta | Lenguaje | Uso |
| :--- | :--- | :--- |
| **wasm-pack** | Rust | Empaquetar Rust a Wasm |
| **wasm-bindgen** | Rust | Bindings JS ↔ Rust |
| **Emscripten** | C/C++ | Compilar C/C++ a Wasm |
| **AssemblyScript** | TypeScript-like | Escribir Wasm con sintaxis JS |
| **TinyGo** | Go | Compilar Go a Wasm |
| **Blazor** | C# | .NET en el navegador |
| **Pyodide** | Python | Python en el navegador |

```bash
# AssemblyScript (el más fácil si vienes de JS)
npm install -g assemblyscript
npx asc modulo.ts -o modulo.wasm
```

---

## ✅ Buenas prácticas

- ✅ **Usa Wasm solo si el rendimiento importa**: para CRUD, JS es suficiente.
- ✅ **Carga el `.wasm` bajo demanda**: no lo cargues en la primera visita si no es necesario.
- ✅ **Mide antes y después**: no asumas que Wasm será más rápido.
- ✅ **Usa `wasm-bindgen`** (Rust) para no escribir bindings a mano.
- ✅ **Cachea el `.wasm`** con Service Worker si es grande.
- ❌ **No reescribas toda tu app en Rust**: integra solo las partes críticas.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-27">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué es WebAssembly?</p>
<button class="quiz-option" data-opt="a">A) Un framework de JavaScript</button>
<button class="quiz-option" data-opt="b">B">Un formato binario para ejecutar otros lenguajes en el navegador</button>
<button class="quiz-option" data-opt="c">C) Una base de datos</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué lenguaje se usa más con Wasm?</p>
<button class="quiz-option" data-opt="a">A) Rust</button>
<button class="quiz-option" data-opt="b">B) PHP</button>
<button class="quiz-option" data-opt="c">C) Ruby</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Cuándo NO usar WebAssembly?</p>
<button class="quiz-option" data-opt="a">A) En juegos 3D</button>
<button class="quiz-option" data-opt="b">B) En edición de imágenes</button>
<button class="quiz-option" data-opt="c">C) En un formulario de contacto</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2027%3A%20WebAssembly&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F27-webassembly%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F27-webassembly%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2027%3A%20WebAssembly%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F27-webassembly%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/27-webassembly/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 28 — IA en el frontend](28-ia-frontend.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }


---

## 🦀 Rust → WebAssembly con `wasm-pack`

Rust es el lenguaje más popular para escribir WebAssembly. Su sistema de tipos y su gestión de memoria sin GC lo hacen ideal para código de alto rendimiento.

### Instalación

~~~bash
# Instalar wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Crear proyecto
cargo new --lib mi-wasm
cd mi-wasm
~~~

### Configurar `Cargo.toml`

~~~toml
[package]
name = "mi-wasm"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
wasm-bindgen = "0.2"
~~~

### Escribir la función en Rust

~~~rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn sumar(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn fib(n: u32) -> u64 {
    if n < 2 { n as u64 } else { fib(n - 1) + fib(n - 2) }
}
~~~

### Compilar

~~~bash
wasm-pack build --target web
~~~

Genera `pkg/` con:
- `mi_wasm_bg.wasm` — el binario
- `mi_wasm.js` — el "pegamento" para llamarlo desde JS
- `mi_wasm.d.ts` — tipos TypeScript

### Usar desde JavaScript

~~~javascript
import init, { sumar, fib } from "./pkg/mi_wasm.js";

await init();

console.log(sumar(2, 3));   // 5
console.log(fib(30));       // 832040
~~~

!!! tip "El `init()` es obligatorio"
    La primera vez hay que llamar a `init()` para cargar el `.wasm`. Es asíncrono porque descarga y compila el binario. Después, las funciones son síncronas.

---

## 🖥️ WASI: WebAssembly fuera del navegador

**WASI** (WebAssembly System Interface) permite ejecutar Wasm **fuera del navegador**, con acceso controlado a archivos, red, reloj, etc. Es la base de los "contenedores Wasm".

### Ejemplo con Wasmtime (runtime de WASI)

~~~bash
# Instalar wasmtime
curl https://wasmtime.dev/install.sh -sSf | bash

# Ejecutar un .wasm con WASI
wasmtime mi-programa.wasm
~~~

### Compilar Rust a WASI

~~~bash
rustup target add wasm32-wasi
cargo build --target wasm32-wasi --release
~~~

### ¿Por qué WASI es importante?

| Ventaja | Detalle |
| :--- | :--- |
| **Portabilidad** | El mismo `.wasm` corre en cualquier SO con un runtime WASI |
| **Seguridad** | El código está aislado por defecto (sin acceso al sistema salvo que lo pidas) |
| **Arranque rápido** | Milisegundos, frente a segundos de un contenedor Docker |
| **Tamaño** | Un `.wasm` puede ser de pocos KB frente a MB de una imagen Docker |

!!! warning "WASI vs Docker"
    WASI **no** sustituye a Docker en todos los casos. Es ideal para funciones pequeñas, plugins y edge computing. Para apps complejas con dependencias del sistema, Docker sigue siendo mejor.

---

## 🎯 Casos de uso reales

WebAssembly no es una promesa de futuro: ya se usa en producción.

| Empresa | Uso |
| :--- | :--- |
| **Figma** | Renderizado vectorial y edición colaborativa en tiempo real |
| **Photoshop (web)** | Procesamiento de imágenes en el navegador |
| **Google Earth** | Visualización 3D del planeta |
| **AutoCAD (web)** | Renderizado CAD en el navegador |
| **Unity / Unreal** | Juegos 3D exportados a WebAssembly |
| **Cloudflare Workers** | Ejecuta Wasm en el edge |
| **1Password** | Criptografía y generación de contraseñas |
| **Zoom (web)** | Procesamiento de audio y vídeo |

!!! tip "¿Cuándo merece la pena Wasm?"
    Cuando necesitas **rendimiento cercano al nativo** o **reutilizar código** de C/C++/Rust en la web. Para todo lo demás, JavaScript sigue siendo la mejor opción.

---

## 🔗 Integración con JavaScript

WebAssembly **no es un reemplazo** de JavaScript: se complementan. La integración es bidireccional.

### Paso de strings (memoria compartida)

Los strings son lo más complicado: Wasm no entiende de UTF-8, solo de bytes.

~~~rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn saludar(nombre: &str) -> String {
    format!("Hola, {}!", nombre)
}
~~~

~~~javascript
import init, { saludar } from "./pkg/mi_wasm.js";
await init();

console.log(saludar("Urukais"));  // "Hola, Urukais!"
~~~

`wasm-bindgen` se encarga de la conversión automáticamente. Sin él, tendrías que gestionar la memoria a mano.

### Paso de arrays

~~~rust
#[wasm_bindgen]
pub fn sumar_array(numeros: &[i32]) -> i32 {
    numeros.iter().sum()
}
~~~

~~~javascript
const numeros = new Int32Array([1, 2, 3, 4, 5]);
console.log(sumar_array(numeros));  // 15
~~~

### Llamar a JavaScript desde Rust

~~~rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    #[wasm_bindgen(js_name = consoleLog)]
    fn console_log(s: &str);
}

#[wasm_bindgen]
pub fn saludar_usuario() {
    alert("¡Hola desde Rust!");
}
~~~

---

## ⚡ Rendimiento: cuándo Wasm gana (y cuándo no)

Wasm no siempre es más rápido que JavaScript. Depende del tipo de tarea.

| Tarea | Ganador | Por qué |
| :--- | :--- | :--- |
| **Bucles numéricos pesados** | ⚡ Wasm | Sin GC, sin tipos dinámicos |
| **Criptografía** | ⚡ Wasm | Operaciones con enteros grandes |
| **Procesamiento de imágenes** | ⚡ Wasm | SIMD, operaciones por píxel |
| **Manipulación del DOM** | 🟡 JavaScript | Acceso directo a las APIs del navegador |
| **Lógica de negocio simple** | 🟡 JavaScript | Evitas la sobrecarga de puente JS↔Wasm |
| **Operaciones con strings** | 🟡 JavaScript | Sin conversión de memoria |

### El coste del puente JS ↔ Wasm

Cada llamada de JS a Wasm (y viceversa) tiene un coste. Si haces miles de llamadas pequeñas, el coste supera la ganancia.

~~~javascript
// ❌ Mal: 10.000 llamadas al puente
for (let i = 0; i < 10000; i++) {
    sumar(1, 1);  // cada llamada cruza el puente
}

// ✅ Bien: una sola llamada, el bucle dentro de Wasm
sumar_muchas_veces(10000);
~~~

!!! warning "Mide antes de optimizar"
    No asumas que Wasm es más rápido. **Benchmarkea** tu caso concreto. A veces JavaScript bien escrito es igual de rápido y mucho más sencillo.

---

## 🧪 Ejercicio práctico

!!! example "Fibonacci en Rust + WebAssembly"
    Crea una función en Rust que calcule el n-ésimo número de Fibonacci, compílala a Wasm y llámala desde JavaScript.

    - Rust: función `fib(n: u32) -> u64` recursiva.
    - JavaScript: llamar a `fib(30)` y medir el tiempo.
    - Comparar con la misma función en JavaScript puro.

??? success "Solución"
    ~~~rust
    // Rust
    use wasm_bindgen::prelude::*;

    #[wasm_bindgen]
    pub fn fib(n: u32) -> u64 {
        if n < 2 { n as u64 } else { fib(n - 1) + fib(n - 2) }
    }
    ~~~

    ~~~javascript
    // JavaScript
    import init, { fib } from "./pkg/mi_wasm.js";
    await init();

    console.time("wasm");
    console.log(fib(30));  // 832040
    console.timeEnd("wasm");

    function fibJS(n) {
        return n < 2 ? n : fibJS(n - 1) + fibJS(n - 2);
    }
    console.time("js");
    console.log(fibJS(30));
    console.timeEnd("js");
    ~~~

    **Resultado típico:** Wasm es 2-5x más rápido en este tipo de bucles numéricos.

---

## 🧠 Quiz de repaso

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué diferencia hay entre WebAssembly y JavaScript?"
    WebAssembly es un **formato binario** de bajo nivel que se ejecuta en la VM del navegador. JavaScript es un lenguaje de alto nivel. Wasm está pensado para rendimiento y reutilización de código (C/C++/Rust); JS para la lógica y el DOM.

??? success "2. ¿Para qué sirve `wasm-bindgen`?"
    Para generar el "pegamento" entre Rust y JavaScript: convierte strings, arrays y estructuras complejas automáticamente. Sin él, tendrías que gestionar la memoria lineal a mano.

??? success "3. ¿Qué es WASI?"
    La **WebAssembly System Interface**. Permite ejecutar Wasm fuera del navegador (servidores, CLIs, edge) con acceso controlado a archivos, red, etc. Es la base de los "contenedores Wasm".

??? success "4. ¿Cuándo NO merece la pena usar Wasm?"
    Cuando la tarea es manipulación del DOM, lógica simple, o strings. El coste del puente JS↔Wasm supera la ganancia. También cuando el equipo no tiene experiencia en C/C++/Rust.

??? success "5. ¿Qué caso de uso real usa WebAssembly en producción?"
    Figma (renderizado vectorial), Photoshop web, Google Earth, AutoCAD web, Unity/Unreal, Cloudflare Workers, 1Password, Zoom web. Todos usan Wasm para rendimiento o reutilización de código.

---

## 📚 Recursos

- [MDN — WebAssembly](https://developer.mozilla.org/es/docs/WebAssembly)
- [Rust — wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [Rust — wasm-bindgen](https://rustwasm.github.io/wasm-bindgen/)
- [WASI — Docs](https://wasi.dev/)
- [Wasmtime — Runtime](https://wasmtime.dev/)
- [web.dev — WebAssembly](https://web.dev/explore/webassembly)
- [Awesome Wasm — Lista de recursos](https://github.com/mbasso/awesome-wasm)

---

➡️ Siguiente capítulo: [28 — IA en el frontend](28-ia-frontend.md)
