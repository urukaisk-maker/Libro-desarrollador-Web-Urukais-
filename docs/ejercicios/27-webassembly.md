# 27 — WebAssembly

!!! quote "Ejercicio resuelto"
    Carga un módulo Wasm y llama a una función.

---

## 🎯 Objetivo

1. Carga un módulo \`.wasm\` con \`WebAssembly.instantiateStreaming\`.
2. Llama a una función exportada.

---

## 💡 Solución

\`\`\`javascript
async function cargarWasm() {
  const { instance } = await WebAssembly.instantiateStreaming(
    fetch('modulo.wasm')
  );

  console.log('Suma:', instance.exports.sumar(2, 3));
  console.log('Fibonacci:', instance.exports.fibonacci(10));
}

cargarWasm().catch(console.error);
\`\`\`

---

## 🧠 Conceptos clave

- \`instantiateStreaming\`: carga y compila en un paso.
- \`instance.exports\`: funciones exportadas por el módulo.
- Los tipos en Wasm son números (i32, i64, f32, f64).

---

## 🚀 Retos extra

- [ ] Compila Rust a Wasm con \`wasm-pack\`.
- [ ] Mide el rendimiento vs JS.
- [ ] Integra Wasm con un Service Worker.

---

[← Ejercicio 26](26-seguridad.md){ .md-button }
[Ir al ejercicio 28 →](28-ia-frontend.md){ .md-button .md-button--primary }
