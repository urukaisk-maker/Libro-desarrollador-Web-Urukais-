---
description: "Solved exercise 14: 14 — Accessibility. Step-by-step annotated solution from the Web Developer's Book."
---
# 14 — Accessibility

!!! quote "Solved exercise"
    Practice semantic HTML, ARIA, and keyboard navigation.

---

## 🎯 Goal

Create a "Close" button that:

1. Is accessible (keyboard + screen reader).
2. Has a descriptive `aria-label`.
3. Shows visual feedback when focused.

---

## 💡 Solution

```html
<button class="cerrar" aria-label="Close modal">✕</button>
```

```css
.cerrar {
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: .5rem .75rem;
  font-size: 1.2rem;
  cursor: pointer;
}

.cerrar:focus-visible {
  outline: 2px solid #6a5acd;
  outline-offset: 2px;
}
```

---

## 🧠 Key Concepts

- Native `<button>` is accessible by default (keyboard + screen reader).
- `aria-label`: describes the button to screen readers.
- `:focus-visible`: focus styling only when navigating with a keyboard.
- **Never** use `<div onclick>` for buttons.

---

## 🚀 Extra Challenges

- [ ] Add a modal using native `<dialog>`.
- [ ] Add `aria-hidden` to decorative elements.
- [ ] Test with a screen reader (Orca, NVDA, or VoiceOver).

---

[← Exercise 13](13-modulos-bundlers.md){ .md-button }
[Go to exercise 15 →](15-typescript.md){ .md-button .md-button--primary }