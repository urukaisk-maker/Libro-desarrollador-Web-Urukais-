---
description: "Solved exercise 03: 03 — Basic CSS. Step-by-step annotated solution from the Web Developer's Book."
---
# 03 — Basic CSS

!!! quote "Solved exercise"
    Practice selectors and the box model.

---

## 🎯 Goal

Create a card with:

1. A rounded border.
2. A shadow.
3. A color background.
4. Centered text.

---

## 💡 Solution

```html
<div class="tarjeta">
  <h2>Ana García</h2>
  <p>Frontend developer</p>
</div>
```

```css
body {
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
  padding: 2rem;
  background: #f0f0f0;
}

.tarjeta {
  background: linear-gradient(135deg, #6a5acd, #00bcd4);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(106, 90, 205, 0.3);
  text-align: center;
  max-width: 300px;
}
```

---

## 🧠 Key Concepts

- `border-radius`: rounds the corners.
- `box-shadow`: adds a shadow (`x y blur color`).
- `linear-gradient`: gradient background.
- `text-align: center`: centers the text.

---

## 🚀 Extra Challenges

- [ ] Add an animation on hover.
- [ ] Change the color based on the system theme with `prefers-color-scheme`.
- [ ] Turn the card into a reusable component.

---

[← Exercise 02](02-html-basico.md){ .md-button }
[Go to exercise 04 →](04-javascript.md){ .md-button .md-button--primary }