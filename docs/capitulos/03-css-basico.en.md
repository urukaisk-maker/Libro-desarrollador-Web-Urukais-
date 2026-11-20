---
description: "Chapter 03 of the Web Developer's Book: 03 — Basic CSS. Learn step by step with examples, exercises, and quizzes."
---
# 03 — Basic CSS

!!! abstract "What you will learn"
    - What CSS is and how it is applied.
    - Selectors, specificity, and the cascade.
    - The box model and `box-sizing`.
    - `display`, `position`, and `z-index`.
    - Flexbox and Grid in depth.
    - CSS variables, modern functions, and `clamp()`.
    - Transitions, transforms, and `prefers-reduced-motion`.
    - Media queries and accessibility.

---

## 🎨 What is CSS?

**CSS** (*Cascading Style Sheets*) is the language that defines the **presentation** of a web page: colors, typography, layout, and animations.

!!! quote "The human body analogy"
    If HTML is the **skeleton**, CSS is the **skin, clothes, and makeup**. It defines how everything structured by HTML looks, feels, and moves.

~~~css
h1 {
  color: #6a5acd;
  font-size: 2rem;
  font-family: system-ui, sans-serif;
}
~~~

---

## 🔗 How to Apply CSS

There are three ways:

### 1. External CSS (recommended)

~~~html
<link rel="stylesheet" href="styles.css">
~~~

### 2. Internal CSS

~~~html
<style>
  h1 { color: red; }
</style>
~~~

### 3. Inline CSS

~~~html
<h1 style="color: red;">Heading</h1>
~~~

!!! tip "Always prefer external CSS"
    External CSS separates structure from presentation, caches better, is reusable, and lets teams collaborate with fewer conflicts.

---

## 🎯 Selectors

~~~css
p { color: #333; }
.boton { background: #6a5acd; }
#header { padding: 1rem; }
nav a { text-decoration: none; }
ul > li { margin: 0.5rem 0; }
a:hover { color: #00bcd4; }
input[type="text"] { border: 1px solid #ccc; }
~~~

| Selector | Example | Usage |
| :--- | :--- | :--- |
| Tag | `p` | All paragraphs |
| Class | `.boton` | Elements with `class="boton"` |
| ID | `#header` | Element with `id="header"` |
| Descendant | `nav a` | Links inside `nav` |
| Direct child | `ul > li` | `li` direct children of `ul` |
| Adjacent sibling | `h2 + p` | First `p` right after an `h2` |
| Pseudo-class | `a:hover` | Link on mouse hover |
| Attribute | `input[type="email"]` | Only email inputs |

!!! tip "`:focus-visible` is accessibility"
    Never remove `outline` without replacing it. `:focus-visible` shows the focus ring only during keyboard navigation, not on mouse click.

---

## ⚖ Specificity and Cascade

| Type | Weight | Example |
| :--- | :--- | :--- |
| Inline styles | `1000` | `style="..."` |
| IDs | `100` | `#header` |
| Classes / attributes / pseudo-classes | `10` | `.boton`, `:hover` |
| Tags / pseudo-elements | `1` | `p`, `::before` |

!!! warning "Avoid `!important"
    `!important` breaks the cascade and makes CSS unpredictable.

---

## 📦 The Box Model

~~~css
.caja {
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #333;
  margin: 8px;
  box-sizing: border-box;
}
~~~

!!! warning "box-sizing: border-box"
    By default, width does not include padding or border. With box-sizing: border-box, it does.

---

## 🧱 `display` and `position`

| Value | `display` | `position` |
| :--- | :--- | :--- |
| `block` | Takes full width | — |
| `inline` | Only what is needed | — |
| `flex` | Flexbox container | — |
| `grid` | Grid container | — |
| `none` | Not rendered | — |
| `static` | — | Normal flow |
| `relative` | — | Its original position |
| `absolute` | — | Nearest positioned ancestor |
| `fixed` | — | The viewport |
| `sticky` | — | Scroll, up to a threshold |

~~~css
.header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; }
.tooltip-wrap { position: relative; }
.tooltip { position: absolute; top: 100%; left: 50%; transform: translateX(-50%); }
.sidebar { position: sticky; top: 2rem; }
~~~

!!! warning "`z-index` only works with `position"
    It has no effect on `static` elements.

---

## 🧩 Flexbox

~~~css
.contenedor {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
.hijo { flex: 1 1 auto; }
~~~

---

## 🔲 Grid

~~~css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}
~~~

### Named Grid Areas

~~~css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  min-height: 100vh;
  gap: 1rem;
}
~~~

---

## 🎨 CSS Variables

~~~css
:root {
  --primario: #6a5acd;
  --acento: #00bcd4;
  --radio: 8px;
}
.boton { background: var(--primario); border-radius: var(--radio); }
~~~

---

## ⚡ Modern Functions

~~~css
h1 { font-size: clamp(1.5rem, 5vw, 3rem); }
.contenedor { width: min(90%, 1200px); }
.layout { height: calc(100vh - 80px); }
.video { aspect-ratio: 16 / 9; }
.avatar { object-fit: cover; border-radius: 50%; }
~~~
---

## 🎬 Transitions and Transforms

~~~css
.boton {
  transition: background 0.2s ease, transform 0.2s ease;
}
.boton:hover {
  background: #5a4abd;
  transform: translateY(-2px);
}
~~~

---

## 📱 Media Queries and Preferences

~~~css
@media screen and (min-width: 640px) {
  .elemento { padding: 2rem; }
}
@media (prefers-color-scheme: dark) {
  body { background: #1a1726; color: #fff; }
}
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
~~~

---

## ♿ CSS Accessibility

- Never remove `outline` without replacing it. Use `:focus-visible`.
- Minimum contrast 4.5:1 (WCAG AA).
- Respect `prefers-reduced-motion`.
- Minimum touch target size: 44×44 px.

~~~css
:root { color-scheme: light dark; }
button:focus-visible { outline: 2px solid #6a5acd; outline-offset: 2px; }
~~~

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-3">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which property enables Flexbox on a container?</p>
<button class="quiz-option" data-opt="a">A) display: grid</button>
<button class="quiz-option" data-opt="b">B) display: flex</button>
<button class="quiz-option" data-opt="c">C) flex: 1</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> What does box-sizing: border-box do?</p>
<button class="quiz-option" data-opt="a">A) Adds a border</button>
<button class="quiz-option" data-opt="b">B) Removes padding</button>
<button class="quiz-option" data-opt="c">C) Width includes padding and border</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> Which layout model is two-dimensional?</p>
<button class="quiz-option" data-opt="a">A) Grid</button>
<button class="quiz-option" data-opt="b">B) Flexbox</button>
<button class="quiz-option" data-opt="c">C) Float</button>
</div>
</div>

---

## 🧪 Practical Exercise

!!! example "Profile card with Flexbox"
    Create a card with a circular avatar, name, description, and a "Follow" button. Use column Flexbox, `gap: 12px`, and a `transition` on button hover.

??? success "Solution"
    ~~~css
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px;
      max-width: 280px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, .08);
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
    .btn {
      padding: 8px 20px;
      background: #6a5acd;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;
    }
    .btn:hover {
      background: #5a4abd;
      transform: translateY(-1px);
    }
    ~~~

---

## 🧠 Review Quiz

!!! question "Check what you learned"

??? success "1. Difference between `padding` and `margin`?"
    `padding` is inner space. `margin` is outer space.

??? success "2. What does `position: absolute` do without a positioned ancestor?"
    It positions relative to the viewport.

??? success "3. Difference between `:is()` and `:where()`?"
    `:is()` inherits specificity. `:where()` always has 0 specificity.

??? success "4. Why use `transform` instead of `top`/`left` for animations?"
    It animates on the GPU and avoids layout reflow.

??? success "5. What does `repeat(auto-fit, minmax(240px, 1fr))` do?"
    Columns of at least 240px with equal distribution.

---

## 📚 Resources

- [MDN — CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [MDN — Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [MDN — Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
- [Flexbox Froggy (game)](https://flexboxfroggy.com/)
- [Grid Garden (game)](https://cssgridgarden.com/)
- [web.dev — Learn CSS](https://web.dev/learn/css)

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%203%3A%20Basic%20CSS&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F03-css-basico%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F03-css-basico%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%203%3A%20Basic%20CSS%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F03-css-basico%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/03-css-basico/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 4 — JavaScript esencial](04-javascript.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }
