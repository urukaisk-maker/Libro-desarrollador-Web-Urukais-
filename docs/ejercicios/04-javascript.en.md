---
description: "Solved exercise 04: 04 — JavaScript. Step-by-step annotated solution from the Web Developer's Book."
---
# 04 — JavaScript

!!! quote "Solved exercise"
    Practice variables, functions, and DOM manipulation.

---

## 🎯 Goal

Create a counter that:

1. Starts at 0.
2. Increments when clicking a button.
3. Displays the number on screen.

---

## 💡 Solution

```html
<h1 id="numero">0</h1>
<button id="incrementar">+1</button>

<script>
  let contador = 0;
  const numero = document.getElementById('numero');
  const boton = document.getElementById('incrementar');

  boton.addEventListener('click', () => {
    contador++;
    numero.textContent = contador;
  });
</script>
```

---

## 🧠 Key Concepts

- `let`: reassignable variable.
- `document.getElementById()`: selects an element by id.
- `addEventListener('click', ...)`: listens for the click event.
- `textContent`: updates the element's text content.

---

## 🚀 Extra Challenges

- [ ] Add a reset button.
- [ ] Add a -1 button.
- [ ] Save the counter to `localStorage` so it persists.

---

[← Exercise 03](03-css-basico.md){ .md-button }
[Go to exercise 05 →](05-responsive.md){ .md-button .md-button--primary }