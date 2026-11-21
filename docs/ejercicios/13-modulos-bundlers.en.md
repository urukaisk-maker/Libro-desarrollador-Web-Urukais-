---
description: "Solved exercise 13: 13 — Modules and bundlers. Step-by-step annotated solution from the Web Developer's Book."
---
# 13 — Modules and bundlers

!!! quote "Solved exercise"
    Practice ES6 modules and bundling with Vite.

---

## 🎯 Goal

1. Create 2 modules: `math.js` (exports `sumar` and `PI`) and `app.js` (imports them).
2. Use `<script type="module">` to load them.
3. Verify that it works in the browser.

---

## 💡 Solution

```javascript
// math.js
export const PI = 3.1416;
export function sumar(a, b) {
  return a + b;
}
```

```javascript
// app.js
import { sumar, PI } from './math.js';
console.log(sumar(2, 3)); // 5
console.log(PI);          // 3.1416
```

```html
<!-- index.html -->
<script type="module" src="app.js"></script>
```

---

## 🧠 Key Concepts

- `export`: exposes functions or constants from a module.
- `import`: imports them into another file.
- `<script type="module">`: loads the module in the browser.
- Modules have their own scope.

---

## 🚀 Extra Challenges

- [ ] Create a `utils.js` module with `esPar` and `esImpar`.
- [ ] Use `export default` for a main function.
- [ ] Migrate the project to Vite (`npm create vite@latest`).

---

[← Exercise 12](12-javascript-asincrono.md){ .md-button }
[Go to exercise 14 →](14-accesibilidad.md){ .md-button .md-button--primary }