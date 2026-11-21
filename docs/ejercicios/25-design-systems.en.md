---
description: "Solved exercise 25: 25 — Design systems. Step-by-step annotated solution from the Web Developer Book."
---
# 25 — Design systems

!!! quote "Solved exercise"
    Create design tokens and a Button component.

---

## 🎯 Goal

1. Define CSS tokens for colors, spacing, and radii.
2. Create a `.btn` component with variants.
3. Use the tokens in the component.

---

## 💡 Solution

```css
:root {
  --color-primary: #6a5acd;
  --color-primary-hover: #7d6ce0;
  --color-danger: #dc3545;
  --space-2: .5rem;
  --space-3: 1rem;
  --radius-md: 8px;
}

.btn {
  padding: var(--space-2) var(--space-3);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background .2s;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: var(--color-primary-hover);
}

.btn--danger {
  background: var(--color-danger);
  color: white;
}
```

```html
<button class="btn btn--primary">Save</button>
<button class="btn btn--danger">Delete</button>
```

---

## 🧠 Key concepts

- Design tokens: semantic CSS custom properties.
- Component with variants (BEM: `.btn--primary`).
- Visual consistency across the entire product.

---

## 🚀 Bonus challenges

- [ ] Add size variants (`--sm`, `--lg`).
- [ ] Add a `:disabled` state.
- [ ] Document the component with Storybook.

---

[← Exercise 24](24-animaciones.md){ .md-button }
[Back to index](index.md){ .md-button .md-button--primary }
