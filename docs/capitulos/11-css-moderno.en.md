---
description: "Chapter 11 of the Web Developer's Book: 11 — Modern CSS. Learn step by step with examples, exercises, and quizzes."
---
# 11 — Modern CSS

!!! abstract "What you will learn"
    - CSS variables and modern functions.
    - Advanced selectors: :has(), :is(), :where().
    - Container queries.
    - Advanced Grid and subgrid.
    - Animations and transitions.

---

## 🎨 CSS Is Not What It Used to Be

CSS has evolved enormously in recent years. What used to require JavaScript or preprocessors is now native: variables, nesting, math functions, container queries…

!!! quote "CSS is a programming language (almost)"
    Even without loops or functions like JavaScript, modern CSS has variables, conditionals (with @supports and media queries), and functions. It is much more powerful than it looks.

---

## 🔤 CSS Variables

```css
:root {
  --primario: #6a5acd;
  --acento: #00bcd4;
  --espaciado: 1rem;
  --radio: 8px;
}

.boton {
  background: var(--primario);
  padding: var(--espaciado);
  border-radius: var(--radio);
}
```

### Benefits

- **Theming**: change one variable and everything updates.
- **Dark mode**: redefine variables inside `[data-theme="dark"]`.
- **Readability**: descriptive names instead of magic values.

```css
[data-theme="dark"] {
  --primario: #a78bfa;
  --acento: #22d3ee;
}
```

---

## 🧮 Modern Functions

### calc()

```css
.elemento {
  width: calc(100% - 2rem);
  padding: calc(var(--espaciado) * 2);
}
```

### clamp()

```css
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}
```

`clamp(min, ideal, max)` is ideal for fluid typography.

### min() and max()

```css
.contenedor {
  width: min(90%, 1200px);
  padding: max(1rem, 2vw);
}
```

### color-mix()

```css
.boton {
  background: color-mix(in srgb, var(--primario) 80%, white);
}
```

---

## 🎯 Advanced Selectors

### :is()

```css
:is(h1, h2, h3) {
  line-height: 1.2;
}
```

### :where()

Just like `:is()`, but with **0 specificity**:

```css
:where(h1, h2, h3) {
  margin: 0;
}
```

### :has()

Selects an element that **contains** another:

```css
.card:has(img) {
  grid-template-columns: 200px 1fr;
}

.form:has(input:invalid) {
  border-color: red;
}
```

!!! tip ":has() is a game changer"
    Previously you needed JavaScript to style a parent based on its children. With `:has()` it's pure CSS. It is now supported across all modern browsers.

### :not()

```css
.boton:not(.boton--disabled) {
  cursor: pointer;
}
```

---

## 📐 Container Queries

**Container queries** let you apply styles based on the size of the **container**, not the viewport.

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
}
```

!!! quote "The end of media queries for components"
    Media queries are still useful for page layouts. But for reusable components, container queries are far more powerful: the same component can look different depending on the space available.

---

## 🔲 Advanced Grid

### Grid template areas

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

### Subgrid

```css
.padre {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.hijo {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;
}
```

### auto-fit vs auto-fill

```css
/* auto-fit: empty tracks collapse */
.grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

/* auto-fill: empty tracks stay */
.grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
```

---

## ✨ Animations and Transitions

### Transitions

```css
.boton {
  transition: background-color .2s ease, transform .15s ease;
}

.boton:hover {
  background-color: var(--acento);
  transform: translateY(-2px);
}
```

### Keyframe animations

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animado {
  animation: fadeIn .4s ease forwards;
}
```

### Respect prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

!!! warning "Accessibility in animations"
    Some people experience motion sickness from animations. Respect `prefers-reduced-motion` whenever possible.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-11">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> How do you declare a CSS variable?</p>
<button class="quiz-option" data-opt="a">A) : value;</button>
<button class="quiz-option" data-opt="b">B) --variable: value;</button>
<button class="quiz-option" data-opt="c">C) var variable = value;</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> Which selector styles a parent that contains a specific child?</p>
<button class="quiz-option" data-opt="a">A) :is()</button>
<button class="quiz-option" data-opt="b">B) :where()</button>
<button class="quiz-option" data-opt="c">C) :has()</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> Which function clamps a value between a minimum and a maximum?</p>
<button class="quiz-option" data-opt="a">A) clamp()</button>
<button class="quiz-option" data-opt="b">B) calc()</button>
<button class="quiz-option" data-opt="c">C) minmax()</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2011%3A%20Modern%20CSS&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F11-css-moderno%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F11-css-moderno%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2011%3A%20Modern%20CSS%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F11-css-moderno%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/11-css-moderno/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 12 — JavaScript asíncrono](12-javascript-asincrono.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }