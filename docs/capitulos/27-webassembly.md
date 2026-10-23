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
