---
description: "Solved exercise 27: 27 — WebAssembly. Step-by-step annotated solution from the Web Developer Book."
---
# 27 — WebAssembly

!!! quote "Solved exercise"
    Load a Wasm module and call an exported function.

---

## 🎯 Goal

1. Load a `.wasm` module with `WebAssembly.instantiateStreaming`.
2. Call an exported function.

---

## 💡 Solution

```javascript
async function cargarWasm() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch('modulo.wasm')
  );

  console.log('Sum:', instance.exports.sumar(2, 3));
  console.log('Fibonacci:', instance.exports.fibonacci(10));
}

cargarWasm().catch(console.error);
```

---

## 🧠 Key concepts

- `instantiateStreaming`: loads and compiles in one step.
- `instance.exports`: functions exported by the module.
- Wasm types are numeric (`i32`, `i64`, `f32`, `f64`).

---

## 🚀 Bonus challenges

- [ ] Compile Rust to Wasm with `wasm-pack`.
- [ ] Benchmark performance vs. JS.
- [ ] Integrate Wasm with a Service Worker.

---

[← Exercise 26](26-seguridad.md){ .md-button }
[Go to exercise 28 →](28-ia-frontend.md){ .md-button .md-button--primary }
