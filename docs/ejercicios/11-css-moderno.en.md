---
description: "Solved exercise 11: 11 — Modern CSS. Step-by-step annotated solution from the Web Developer's Book."
---
# 11 — Modern CSS

!!! quote "Solved exercise"
    Practice CSS custom properties, `:has()`, and container queries.

---

## 🎯 Goal

Create a card that:

1. Uses CSS custom properties for colors.
2. Changes layout when it contains an image (`:has()`).
3. Adapts to its container's size (container query).

---

## 💡 Solution

```html
<div class="card-container">
  <div class="card">
    <img src="[https://picsum.photos/200](https://picsum.photos/200)" alt="Example">
    <h3>Card with image</h3>
  </div>
</div>
```

```css
:root {
  --primario: #6a5acd;
  --fondo: #f8f7fb;
}

.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  background: var(--fondo);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.card:has(img) {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
}

@container card (min-width: 400px) {
  .card {
    padding: 2rem;
  }
}
```

---

## 🧠 Key Concepts

- `:has(img)`: applies styles when the element contains an image.
- `container-type: inline-size`: enables container queries.
- `@container card (min-width: 400px)`: applies styles based on the container width.
- CSS custom properties for theming.

---

## 🚀 Extra Challenges

- [ ] Switch variables in dark mode with `prefers-color-scheme`.
- [ ] Add `:focus-within` to highlight the card when an input inside it is focused.
- [ ] Use `clamp()` for font size.

---

[← Exercise 10](10-proyecto-final.md){ .md-button }
[Go to exercise 12 →](12-javascript-asincrono.md){ .md-button .md-button--primary }