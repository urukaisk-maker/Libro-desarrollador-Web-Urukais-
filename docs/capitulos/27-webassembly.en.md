---
description: "Chapter 27 of the Web Developer's Book: 27 — WebAssembly. Learn step by step with examples, exercises, and quizzes."
---
# 27 — WebAssembly

!!! abstract "What you will learn"
    - What WebAssembly is and why it exists.
    - When to use it and when not to.
    - Compiling Rust to Wasm.
    - Integrating it with JavaScript.
    - Real-world use cases.

---

## 🧩 What is WebAssembly?

**WebAssembly** (Wasm) is a binary format that lets you run code from **other languages** (Rust, C, C++, Go…) in the browser at **near-native speed**. It does not replace JavaScript—it complements it.

```
JavaScript  → fast, but less so for heavy computation
WebAssembly → near-native speed for heavy computation
```

!!! quote "Wasm doesn't replace JS"
    WebAssembly isn't going to replace JavaScript. It coexists with it: JS for app logic, Wasm for the parts that need maximum performance.

---

## 🎯 When to Use WebAssembly?

| Use Case | Wasm? |
| :--- | :--- |
| Real-time video and audio | ✅ |
| 3D games and simulations | ✅ |
| Cryptography and compression | ✅ |
| Browser image editing | ✅ |
| AI and machine learning | ✅ |
| Web app CRUD | ❌ |
| Forms and validations | ❌ |
| Basic animations | ❌ |

---

## 🦀 Compiling Rust to WebAssembly

```bash
# Install wasm-pack
curl [https://rustwasm.github.io/wasm-pack/installer/init.sh](https://rustwasm.github.io/wasm-pack/installer/init.sh) -sSf | sh

# Create project
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

This generates a `pkg/` folder with the `.wasm` binary and JavaScript bindings.

---

## 🔗 Integrating with JavaScript

```html
<script type="module">
  import init, { sumar, fibonacci } from "./pkg/mi_wasm.js";

  await init();
  console.log(sumar(2, 3));      // 5
  console.log(fibonacci(40));    // 102334155 (fast)
</script>
```

!!! tip "async init"
    The `init()` function loads and compiles the `.wasm` binary. It returns a promise, so you must `await` it.

---

## ⚡ WebAssembly in the Browser (Native API)

```javascript
const respuesta = await fetch("modulo.wasm");
const bytes = await respuesta.arrayBuffer();
const { instance } = await WebAssembly.instantiate(bytes);

console.log(instance.exports.sumar(2, 3));
```

The native API is more verbose. `wasm-bindgen` (Rust) or `Emscripten` (C/C++) generate the bindings automatically.

---

## 🏆 Real-World Use Cases

| Company | Wasm Usage |
| :--- | :--- |
| **Figma** | Vector graphics rendering and editing |
| **Google Earth** | 3D planet visualization |
| **AutoCAD Web** | Browser-based CAD design |
| **Photoshop Web** | Image editing |
| **Zoom** | Video and audio processing |
| **Unity** | 3D browser games |
| **Pyodide** | Full Python in the browser |

---

## ⚡ Performance: Wasm vs. JS

| Task | JavaScript | WebAssembly | Speedup |
| :--- | :--- | :--- | :--- |
| Fibonacci(40) | ~2 s | ~0.4 s | **5x** |
| gzip compression | ~1.5 s | ~0.3 s | **5x** |
| 3D rendering | ~16 ms/frame | ~4 ms/frame | **4x** |
| Matrix math | ~800 ms | ~100 ms | **8x** |

!!! note "Numbers vary"
    These figures are approximate. They depend on browser, hardware, and task type. For small operations, `.wasm` loading overhead may outweigh any benefit.

---

## 🛠 Tools

| Tool | Language | Purpose |
| :--- | :--- | :--- |
| **wasm-pack** | Rust | Package Rust into Wasm |
| **wasm-bindgen** | Rust | JS ↔ Rust bindings |
| **Emscripten** | C/C++ | Compile C/C++ to Wasm |
| **AssemblyScript** | TypeScript-like | Write Wasm with JS-like syntax |
| **TinyGo** | Go | Compile Go to Wasm |
| **Blazor** | C# | .NET in the browser |
| **Pyodide** | Python | Python in the browser |

```bash
# AssemblyScript (easiest if coming from JS)
npm install -g assemblyscript
npx asc modulo.ts -o modulo.wasm
```

---

## ✅ Best Practices

- ✅ **Use Wasm only when performance matters**: for CRUD, JS is enough.
- ✅ **Load `.wasm` on demand**: don't load it on first visit if unneeded.
- ✅ **Measure before and after**: don't assume Wasm will be faster.
- ✅ **Use `wasm-bindgen`** (Rust) instead of writing bindings by hand.
- ✅ **Cache `.wasm`** with a Service Worker if it's large.
- ❌ **Don't rewrite your whole app in Rust**: integrate only critical parts.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-27">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> What is WebAssembly?</p>
<button class="quiz-option" data-opt="a">A) A JavaScript framework</button>
<button class="quiz-option" data-opt="b">B) A binary format to run other languages in the browser</button>
<button class="quiz-option" data-opt="c">C) A database</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which language is most commonly used with Wasm?</p>
<button class="quiz-option" data-opt="a">A) Rust</button>
<button class="quiz-option" data-opt="b">B) PHP</button>
<button class="quiz-option" data-opt="c">C) Ruby</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> When should you NOT use WebAssembly?</p>
<button class="quiz-option" data-opt="a">A) In 3D games</button>
<button class="quiz-option" data-opt="b">B) In image editing</button>
<button class="quiz-option" data-opt="c">C) In a contact form</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2027%3A%20WebAssembly&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F27-webassembly%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F27-webassembly%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2027%3A%20WebAssembly%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F27-webassembly%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/27-webassembly/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 28 — IA en el frontend](28-ia-frontend.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }



---

## 🦀 Rust → WebAssembly with `wasm-pack`

Rust is the most popular language for writing WebAssembly. Its type system and memory management without GC make it ideal for high-performance code.

### Installation

~~~bash
# Install wasm-pack
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

# Create project
cargo new --lib mi-wasm
cd mi-wasm
~~~

### Configure `Cargo.toml`

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

### Write the Function in Rust

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

### Compile

~~~bash
wasm-pack build --target web
~~~

Generates `pkg/` with:
- `mi_wasm_bg.wasm` — the binary
- `mi_wasm.js` — the "glue" to call it from JS
- `mi_wasm.d.ts` — TypeScript types

### Use from JavaScript

~~~javascript
import init, { sumar, fib } from "./pkg/mi_wasm.js";

await init();

console.log(sumar(2, 3));   // 5
console.log(fib(30));       // 832040
~~~

!!! tip "`init()` is required"
    The first time you must call `init()` to load the `.wasm`. It is asynchronous because it downloads and compiles the binary. Afterward, the functions are synchronous.

---

## 🖥 WASI: WebAssembly Outside the Browser

**WASI** (WebAssembly System Interface) lets you run Wasm **outside the browser**, with controlled access to files, network, clock, etc. It is the foundation of "Wasm containers".

### Example with Wasmtime (WASI runtime)

~~~bash
# Install wasmtime
curl https://wasmtime.dev/install.sh -sSf | bash

# Run a .wasm with WASI
wasmtime mi-programa.wasm
~~~

### Compile Rust to WASI

~~~bash
rustup target add wasm32-wasi
cargo build --target wasm32-wasi --release
~~~

### Why WASI Matters

| Benefit | Detail |
| :--- | :--- |
| **Portability** | The same `.wasm` runs on any OS with a WASI runtime |
| **Security** | Code is sandboxed by default (no system access unless requested) |
| **Fast startup** | Milliseconds, compared to seconds for a Docker container |
| **Size** | A `.wasm` can be a few KB vs. MB for a Docker image |

!!! warning "WASI vs. Docker"
    WASI **does not** replace Docker in every case. It's ideal for small functions, plugins, and edge computing. For complex apps with system dependencies, Docker is still better.

---

## 🎯 Real-World Use Cases

WebAssembly isn't just a future promise—it's already used in production.

| Company | Use |
| :--- | :--- |
| **Figma** | Vector rendering and real-time collaborative editing |
| **Photoshop (web)** | Browser-based image processing |
| **Google Earth** | 3D planet visualization |
| **AutoCAD (web)** | CAD rendering in the browser |
| **Unity / Unreal** | 3D games exported to WebAssembly |
| **Cloudflare Workers** | Runs Wasm at the edge |
| **1Password** | Cryptography and password generation |
| **Zoom (web)** | Audio and video processing |

!!! tip "When is Wasm worth it?"
    When you need **near-native performance** or to **reuse C/C++/Rust code** on the web. For everything else, JavaScript remains the best choice.

---

## 🔗 Integrating with JavaScript

WebAssembly **is not a replacement** for JavaScript: they complement each other. Integration is bidirectional.

### Passing Strings (Shared Memory)

Strings are the trickiest part: Wasm doesn't understand UTF-8, only bytes.

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

`wasm-bindgen` handles the conversion automatically. Without it, you'd have to manage memory manually.

### Passing Arrays

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

### Calling JavaScript from Rust

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

## ⚡ Performance: When Wasm Wins (and When It Doesn't)

Wasm isn't always faster than JavaScript. It depends on the task type.

| Task | Winner | Why |
| :--- | :--- | :--- |
| **Heavy numeric loops** | ⚡ Wasm | No GC, no dynamic types |
| **Cryptography** | ⚡ Wasm | Large integer operations |
| **Image processing** | ⚡ Wasm | SIMD, per-pixel operations |
| **DOM manipulation** | 🟡 JavaScript | Direct access to browser APIs |
| **Simple business logic** | 🟡 JavaScript | Avoids JS↔Wasm bridge overhead |
| **String operations** | 🟡 JavaScript | No memory conversion |

### The Cost of the JS ↔ Wasm Bridge

Every call from JS to Wasm (and back) has a cost. If you make thousands of tiny calls, the overhead exceeds the gain.

~~~javascript
// ❌ Bad: 10,000 bridge calls
for (let i = 0; i < 10000; i++) {
    sumar(1, 1);  // each call crosses the bridge
}

// ✅ Good: single call, loop inside Wasm
sumar_muchas_veces(10000);
~~~

!!! warning "Measure before optimizing"
    Don't assume Wasm is faster. **Benchmark** your specific case. Sometimes well-written JavaScript is just as fast and much simpler.

---

## 🧪 Hands-On Exercise

!!! example "Fibonacci in Rust + WebAssembly"
    Create a function in Rust that computes the nth Fibonacci number, compile it to Wasm, and call it from JavaScript.

    - Rust: recursive `fib(n: u32) -> u64` function.
    - JavaScript: call `fib(30)` and measure elapsed time.
    - Compare with the same function in plain JavaScript.

??? success "Solution"
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

    **Typical result:** Wasm is 2-5x faster in this type of numeric loop.

---

## 🧠 Review Quiz

!!! question "Check what you learned"

??? success "1. What is the difference between WebAssembly and JavaScript?"
    WebAssembly is a low-level **binary format** that runs in the browser VM. JavaScript is a high-level language. Wasm is designed for performance and code reuse (C/C++/Rust); JS for logic and the DOM.

??? success "2. What is `wasm-bindgen` for?"
    To generate the "glue" between Rust and JavaScript: it converts strings, arrays, and complex structures automatically. Without it, you'd have to manage linear memory by hand.

??? success "3. What is WASI?"
    The **WebAssembly System Interface**. It lets you run Wasm outside the browser (servers, CLIs, edge) with controlled access to files, network, etc. It is the foundation of "Wasm containers".

??? success "4. When is Wasm NOT worth using?"
    When the task is DOM manipulation, simple logic, or strings. The JS↔Wasm bridge overhead outweighs the gain. Also when the team lacks C/C++/Rust experience.

??? success "5. Which real-world use case uses WebAssembly in production?"
    Figma (vector rendering), Photoshop web, Google Earth, AutoCAD web, Unity/Unreal, Cloudflare Workers, 1Password, Zoom web. All use Wasm for performance or code reuse.

---

## 📚 Resources

- [MDN — WebAssembly](https://developer.mozilla.org/es/docs/WebAssembly)
- [Rust — wasm-pack](https://rustwasm.github.io/wasm-pack/)
- [Rust — wasm-bindgen](https://rustwasm.github.io/wasm-bindgen/)
- [WASI — Docs](https://wasi.dev/)
- [Wasmtime — Runtime](https://wasmtime.dev/)
- [web.dev — WebAssembly](https://web.dev/explore/webassembly)
- [Awesome Wasm — Lista de recursos](https://github.com/mbasso/awesome-wasm)

---

➡ Next chapter: [28 — IA en el frontend](28-ia-frontend.md)