# Ejercicios resueltos — Capítulo 27

[Volver al índice](index.md) · [Capítulo original](../capitulos/27-webassembly.md)

## Ejercicio 1: Fibonacci en Wasm

> Compila una función de Fibonacci a Wasm con Rust.

### Solución

**Instalar herramientas:**

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install wasm-pack
```

**Crear proyecto:**

```bash
cargo new --lib fib-wasm
cd fib-wasm
```

**`Cargo.toml`:**

```toml
[package]
name = "fib-wasm"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

**`src/lib.rs`:**

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn fibonacci(n: u32) -> u64 {
    let mut a: u64 = 0;
    let mut b: u64 = 1;
    for _ in 0..n {
        let t = a + b;
        a = b;
        b = t;
    }
    a
}
```

**Compilar:**

```bash
wasm-pack build --target web
```

Genera `pkg/` con el `.wasm` y el JS de pegamento.

---

## Ejercicio 2: Paquete npm con `wasm-pack`

> Crea un paquete npm con tu módulo.

### Solución

```bash
wasm-pack build --target bundler
cd pkg
npm publish --access public
```

Desde otro proyecto:

```bash
npm install fib-wasm
```

```javascript
import { fibonacci } from 'fib-wasm';
console.log(fibonacci(40));
```

---

## Ejercicio 3: Porta una función intensiva

> Porta una función intensiva a Wasm y mide.

### Solución

**JavaScript puro:**

```javascript
function contarPrimos(limite) {
  let contador = 0;
  for (let n = 2; n <= limite; n++) {
    let esPrimo = true;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) { esPrimo = false; break; }
    }
    if (esPrimo) contador++;
  }
  return contador;
}

const inicio = performance.now();
contarPrimos(100000);
console.log('JS:', performance.now() - inicio, 'ms');
```

**En Rust/Wasm:**

```rust
#[wasm_bindgen]
pub fn contar_primos(limite: u32) -> u32 {
    let mut contador = 0;
    for n in 2..=limite {
        let mut es_primo = true;
        let mut i = 2;
        while i * i <= n {
            if n % i == 0 { es_primo = false; break; }
            i += 1;
        }
        if es_primo { contador += 1; }
    }
    contador
}
```

**Comparativa típica:** Wasm es 5-10× más rápido.

---

## Ejercicio 4: Cloudflare Workers

> Prueba un módulo Wasm desde Cloudflare Workers.

### Solución

```bash
npm create cloudflare@latest mi-worker
cd mi-worker
```

`wrangler.toml`:

```toml
name = "mi-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"
```

`src/index.js`:

```javascript
import wasm from './modulo.wasm';

export default {
  async fetch(request) {
    const instancia = await WebAssembly.instantiate(wasm);
    const resultado = instancia.exports.sumar(2, 3);

    return new Response(`Resultado: ${resultado}`);
  },
};
```

Despliega:

```bash
npx wrangler deploy
```

---

## Ejercicio 5: Comparar rendimiento

> Escribe el mismo algoritmo en JS y Rust.

### Solución

**Medir con `performance.now()`:**

```javascript
import init, { calcular } from './pkg/mi_wasm.js';
await init();

// JS
const t1 = performance.now();
const r1 = calcularJS();
console.log('JS:', performance.now() - t1);

// Wasm
const t2 = performance.now();
const r2 = calcular();
console.log('Wasm:', performance.now() - t2);
```

**Recomendación:**
- Tareas <10 ms → JS.
- Tareas intensivas (>100 ms) → Wasm.
- Recuerda: el `.wasm` tarda en descargar la primera vez.

---

## Ejercicio 6: Web Worker

> Añade un Web Worker que ejecute el Wasm en segundo plano.

### Solución

`worker.js`:

```javascript
import init, { fibonacci } from './pkg/fib_wasm.js';

let listo = false;

self.onmessage = async (e) => {
  if (!listo) {
    await init();
    listo = true;
  }

  const { n } = e.data;
  const resultado = fibonacci(n);
  self.postMessage({ resultado });
};
```

`main.js`:

```javascript
const worker = new Worker('./worker.js', { type: 'module' });

worker.postMessage({ n: 1000 });
worker.onmessage = (e) => console.log('Resultado:', e.data.resultado);
```

**Ventaja:** la UI no se bloquea mientras se calcula.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/27-webassembly.md)
