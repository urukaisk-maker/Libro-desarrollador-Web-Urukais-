---
description: "Solved exercise 24: 24 — Animations. Step-by-step annotated solution from the Web Developer Book."
---
# 24 — Animations

!!! quote "Solved exercise"
    Animate an element with transform and opacity.

---

## 🎯 Goal

Create an animation that:

1. Moves a square from left to right.
2. Changes its opacity.
3. Uses `transform` and `opacity` (not `left`).
4. Respects `prefers-reduced-motion`.

---

## 💡 Solution

```html
<div class="cuadrado"></div>
```

```css
.cuadrado {
  width: 100px;
  height: 100px;
  background: #6a5acd;
  animation: mover 2s ease-in-out infinite alternate;
}

@keyframes mover {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(200px);
    opacity: 0.5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cuadrado { animation: none; }
}
```

---

## 🧠 Key concepts

- `transform` and `opacity` are GPU-friendly.
- `@keyframes`: defines the animation.
- `prefers-reduced-motion`: respects accessibility preferences.

---

## 🚀 Bonus challenges

- [ ] Use the Web Animations API instead of CSS.
- [ ] Add stagger to a list of elements.
- [ ] Animate on scroll with Intersection Observer.

---

[← Exercise 23](23-websockets.md){ .md-button }
[Go to exercise 25 →](25-design-systems.md){ .md-button .md-button--primary }
