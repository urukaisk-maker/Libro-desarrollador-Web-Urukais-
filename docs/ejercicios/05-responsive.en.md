---
description: "Solved exercise 05: 05 — Responsive. Step-by-step annotated solution from the Web Developer's Book."
---
# 05 — Responsive

!!! quote "Solved exercise"
    Practice responsive design with media queries.

---

## 🎯 Goal

Create a gallery that:

1. Shows 1 column on mobile.
2. Shows 2 columns on tablet.
3. Shows 3 columns on desktop.

---

## 💡 Solution

```html
<div class="galeria">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

```css
.galeria {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 640px) {
  .galeria {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .galeria {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item {
  background: #6a5acd;
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
}
```

---

## 🧠 Key Concepts

- **Mobile first**: starts with 1 column and scales up with `min-width`.
- `grid-template-columns`: defines the columns.
- `repeat(n, 1fr)`: repeats n equal-sized columns.
- `@media (min-width: ...)`: applies styles starting from that width.

---

## 🚀 Extra Challenges

- [ ] Use `auto-fit` with `minmax` so it adapts automatically.
- [ ] Add hover styles to each item.
- [ ] Add images instead of numbers.

---

[← Exercise 04](04-javascript.md){ .md-button }
[Back to index](index.md){ .md-button .md-button--primary }