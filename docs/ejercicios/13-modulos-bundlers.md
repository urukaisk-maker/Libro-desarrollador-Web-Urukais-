# 13 — Módulos y bundlers

!!! quote "Ejercicio resuelto"
    Practica módulos ES6 y compilación con Vite.

---

## 🎯 Objetivo

1. Crea 2 módulos: \`math.js\` (exporta \`sumar\` y \`PI\`) y \`app.js\` (los importa).
2. Usa \`<script type="module">\` para cargarlos.
3. Comprueba que funciona en el navegador.

---

## 💡 Solución

\`\`\`javascript
// math.js
export const PI = 3.1416;
export function sumar(a, b) {
  return a + b;
}
\`\`\`

\`\`\`javascript
// app.js
import { sumar, PI } from './math.js';
console.log(sumar(2, 3)); // 5
console.log(PI);          // 3.1416
\`\`\`

\`\`\`html
<!-- index.html -->
<script type="module" src="app.js"></script>
\`\`\`

---

## 🧠 Conceptos clave

- \`export\`: expone funciones o constantes del módulo.
- \`import\`: las importa en otro archivo.
- \`<script type="module">\`: carga el módulo en el navegador.
- Los módulos tienen scope propio.

---

## 🚀 Retos extra

- [ ] Crea un módulo \`utils.js\` con \`esPar\` y \`esImpar\`.
- [ ] Usa \`export default\` para una función principal.
- [ ] Migra el proyecto a Vite (\`npm create vite@latest\`).

---

[← Ejercicio 12](12-javascript-asincrono.md){ .md-button }
[Ir al ejercicio 14 →](14-accesibilidad.md){ .md-button .md-button--primary }
