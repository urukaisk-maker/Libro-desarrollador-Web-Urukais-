---
description: "Solved exercise 21: 21 — Web Components. Step-by-step annotated solution from the Web Developer Book."
---
# 21 — Web Components

!!! quote "Solved exercise"
    Create a native component with Custom Elements and Shadow DOM.

---

## 🎯 Goal

Create a `<mi-tarjeta>` component that:

1. Uses Shadow DOM to encapsulate styles.
2. Receives a `titulo` attribute.
3. Uses a `<slot>` for content.

---

## 💡 Solution

```javascript
class MiTarjeta extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .card {
          background: #6a5acd;
          color: white;
          padding: 1rem;
          border-radius: 8px;
        }
      </style>
      <div class="card">
        <h3>${this.getAttribute('titulo') || 'Card'}</h3>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('mi-tarjeta', MiTarjeta);
```

```html
<mi-tarjeta titulo="Hello">Slot content</mi-tarjeta>
```

---

## 🧠 Key concepts

- `attachShadow({ mode: 'open' })`: creates the Shadow DOM.
- `<slot>`: injects external content.
- `customElements.define()`: registers the component.
- Shadow DOM styles do not leak outside.

---

## 🚀 Bonus challenges

- [ ] Add an observed attribute with `observedAttributes`.
- [ ] Add a custom event on click.
- [ ] Use a `<template>` for the markup.

---

[← Exercise 20](20-devops.md){ .md-button }
[Go to exercise 22 →](22-pwa.md){ .md-button .md-button--primary }
