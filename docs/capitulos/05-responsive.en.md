---
description: "Chapter 05 of the Web Developer's Book: 05 — Responsive Design. Learn step by step with examples, exercises, and quizzes."
---
# 05 — Responsive Design

!!! abstract "What you will learn"
    - What responsive design is and why it is mandatory today.
    - The **mobile-first** philosophy.
    - `meta viewport` and why it is essential.
    - Media queries, relative units, and modern functions (`clamp()`).
    - Responsive images and container queries.

---

## 📱 What is Responsive Design?

**Responsive design** (or adaptive design) is the practice of building a website that looks and works well across **any screen size**: mobile, tablet, laptop, or 4K monitor.

!!! quote "The water analogy"
    Water adapts to the container that holds it. A responsive site should do the same: instead of "breaking" when resized, it **reorganizes** so it stays usable.

~~~mermaid
graph LR
    A[Mobile 320px] --> B[Tablet 768px]
    B --> C[Laptop 1024px]
    C --> D[Desktop 1440px+]
    A -.-> E[Same HTML]
    B -.-> E
    C -.-> E
    D -.-> E
~~~

---

## 🏛 Mobile-first

**Mobile-first** means designing for mobile first and **then** expanding for larger screens. It is the opposite of "design for desktop and adapt it later".

| Approach | Advantage | Disadvantage |
| :--- | :--- | :--- |
| **Mobile-first** | Cleaner CSS, better mobile performance | More upfront work on mobile |
| **Desktop-first** | Faster if you already have a desktop design | CSS with more `max-width`, more tech debt |

!!! tip "Why mobile-first"
    Mobile traffic exceeds 60% on most sites. Designing for mobile first forces you to prioritize content and simplify. In CSS, `min-width` (mobile-first) is cleaner than `max-width` (desktop-first).

---

## 🖥 Meta Viewport (Essential)

Without this tag in `<head>`, mobile browsers **simulate** a 980px width and zoom out. Result: tiny, unreadable text.

~~~html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
~~~

- `width=device-width` → the viewport width matches the device's real width.
- `initial-scale=1.0` → no initial zoom.

!!! warning "No viewport, no responsive"
    It is the #1 beginner mistake. If your site looks "tiny" on mobile, check this tag.

---

## 📐 Media Queries

**Media queries** apply CSS only when a condition is met (screen width, orientation, preferences…).

~~~css
/* Base: mobile */
.container {
    padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .container {
        padding: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}
~~~

### Common Breakpoints

| Name | Width | Typical use |
| :--- | :--- | :--- |
| **xs** | 0–479px | Small mobile |
| **sm** | ≥ 480px | Large mobile |
| **md** | ≥ 768px | Tablet |
| **lg** | ≥ 1024px | Laptop / desktop |
| **xl** | ≥ 1280px | Large desktop |
| **2xl** | ≥ 1536px | 4K monitor |

!!! tip "Don't chase devices"
    Breakpoints should be based on **where your layout breaks**, not on "the width of an iPhone 15". Add media queries when content needs them.

### User Preferences

~~~css
/* System dark mode */
@media (prefers-color-scheme: dark) {
    body { background: #111; color: #eee; }
}

/* Reduce motion (accessibility) */
@media (prefers-reduced-motion: reduce) {
    * { animation: none !important; transition: none !important; }
}
~~~

---

## 📏 Relative Units

**Absolute** units (`px`) don't scale. **Relative** units do:

| Unit | Reference | Example |
| :--- | :--- | :--- |
| `rem` | **Root** font size (16px by default) | `font-size: 1.5rem;` = 24px |
| `em` | **Parent element's** font size | `padding: 1em;` |
| `%` | **Container's** width/height | `width: 100%;` |
| `vw` / `vh` | 1% of **viewport** | `height: 100vh;` (full screen) |
| `svh` / `dvh` | **Dynamic** viewport (mobile with bar) | `height: 100dvh;` |

!!! warning "Careful with `vh` on mobile"
    `100vh` on mobile includes the browser bar → clipped content. Use `100svh` (smallest) or `100dvh` (dynamic) for full screen.

### `clamp()`: The Magic Function

~~~css
/* Fluid size: min 1rem, ideal 4vw, max 3rem */
h1 {
    font-size: clamp(1rem, 4vw, 3rem);
}
~~~

`clamp(min, preferred, max)` scales **smoothly** between two values. Great for headings and spacing.

~~~css
/* Fluid spacing without media queries */
.section {
    padding: clamp(1rem, 5vw, 4rem);
}
~~~

---

## 🖼 Responsive Images

### `max-width: 100%` (The Foundation)

~~~css
img {
    max-width: 100%;
    height: auto;
}
~~~

Prevents images from overflowing their container.

### `srcset` and `sizes`

To serve **the right image** for each screen (and save data):

~~~html
<img
    src="foto-800.jpg"
    srcset="foto-400.jpg 400w, foto-800.jpg 800w, foto-1600.jpg 1600w"
    sizes="(max-width: 600px) 100vw, 50vw"
    alt="Responsive example"
>
~~~

- `srcset` → list of images with their real width.
- `sizes` → how much width it will take on each screen.
- The browser **picks** the best option.

### `<picture>` (Alternative Formats)

~~~html
<picture>
    <source srcset="foto.avif" type="image/avif">
    <source srcset="foto.webp" type="image/webp">
    <img src="foto.jpg" alt="Example">
</picture>
~~~

The browser uses the first format it supports (AVIF > WebP > JPG). Saves bandwidth in modern browsers.

---

## 📦 Container Queries (Modern)

**Container queries** apply CSS based on a **parent container's** size, not the viewport. They are the natural evolution of media queries.

~~~css
.card-wrapper {
    container-type: inline-size;
}

.card {
    padding: 1rem;
}

@container (min-width: 400px) {
    .card {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 1rem;
    }
}
~~~

**Key difference:**
- Media query → "if the **screen** is wide…"
- Container query → "if the **container** is wide…"

The same component can look different depending on where it sits (sidebar, hero, grid). Support: 90%+ modern browsers (2024).

!!! tip "Media vs Container"
    Use **media queries** for global layout (header, footer, sidebar). Use **container queries** for **reusable components** (cards, widgets, buttons).

---

## 🧩 Responsive Patterns

### 1. Auto-Adaptive Grid (No Media Queries)

~~~css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
~~~

Creates as many columns as fit (minimum 250px). **Zero media queries**.

### 2. Flexbox with Wrap

~~~css
.flex {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.flex > * {
    flex: 1 1 250px;
}
~~~

### 3. Responsive Navigation

~~~css
.nav {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

@media (max-width: 600px) {
    .nav {
        flex-direction: column;
    }
}
~~~

---

## 🏗 Complete Example: Responsive Card

~~~html
<article class="card">
    <img src="foto.jpg" alt="Product">
    <div class="card-body">
        <h2>Mechanical keyboard</h2>
        <p>89 €</p>
        <button>Buy</button>
    </div>
</article>
~~~

~~~css
.card {
    display: flex;
    flex-direction: column;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,.1);
}

.card img {
    width: 100%;
    height: auto;
}

.card-body {
    padding: clamp(1rem, 3vw, 2rem);
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

/* On wide screens, image on the left */
@media (min-width: 768px) {
    .card {
        flex-direction: row;
    }
    .card img {
        width: 40%;
        object-fit: cover;
    }
}
~~~

---

## 🧪 Practical Exercise

!!! example "Hero with fluid typography"
    Create a "hero" section with:

    - An `<h1>` heading with a fluid size between `1.5rem` and `4rem`.
    - A `<p>` paragraph with a max width of `60ch`.
    - Horizontally centered with fluid `padding`.

    Do not use media queries. Use `clamp()` and relative units.

??? success "Solution"
    ~~~css
    .hero {
        padding: clamp(2rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem);
        text-align: center;
        background: linear-gradient(135deg, #6a5acd, #00bcd4);
        color: #fff;
    }

    .hero h1 {
        font-size: clamp(1.5rem, 5vw, 4rem);
        line-height: 1.2;
        margin: 0 auto 1rem;
        max-width: 20ch;
    }

    .hero p {
        font-size: clamp(1rem, 1.5vw, 1.25rem);
        max-width: 60ch;
        margin: 0 auto;
    }
    ~~~

    **Key points:** `clamp()` for typography and spacing, `max-width` in `ch` (character width) for comfortable reading, `margin: 0 auto` to center.

---

## 🧠 Quiz

!!! question "Check what you learned"

??? success "1. What is `meta viewport` for?"
    Without it, mobile browsers simulate a 980px width and zoom out. With `width=device-width, initial-scale=1.0`, the browser uses the device's real width and applies no initial zoom.

??? success "2. What is the difference between `rem`, `em`, and `vw`?"
    `rem` → **root** font size (`html`). `em` → **parent element's** font size. `vw` → 1% of **viewport width**.

??? success "3. What does `clamp(1rem, 4vw, 3rem)` do?"
    Returns a fluid size: never less than `1rem`, never more than `3rem`, scaling with `4vw` in between.

??? success "4. When should you use `container queries` instead of media queries?"
    For **reusable components** whose layout should adapt to the **space available in their container**, not the viewport size.

??? success "5. Why can `100vh` fail on mobile?"
    Because it includes the browser navigation bar, which shows and hides. Use `100svh` (smallest) or `100dvh` (dynamic) for a safe full screen.

---

## 📚 Resources

- [MDN — Responsive design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [MDN — `clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp)
- [MDN — Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)
- [web.dev — Learn Responsive Design](https://web.dev/learn/design/)
- [Can I use — Container queries](https://caniuse.com/css-container-queries)
- [Modern CSS Solutions — Fluid typography](https://moderncss.dev/)

---

➡ Next chapter: [06 — Formularios](06-formularios.md)


---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-5">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which meta tag is essential for responsive design?</p>
<button class="quiz-option" data-opt="a">A) meta charset</button>
<button class="quiz-option" data-opt="b">B) meta viewport</button>
<button class="quiz-option" data-opt="c">C) meta description</button>
</div>
<div class="quiz-question" data-answer="b">
<p><strong>2.</strong> What does clamp(1rem, 4vw, 3rem) do?</p>
<button class="quiz-option" data-opt="a">A) Fixes size at 1rem</button>
<button class="quiz-option" data-opt="b">B) Scales between 1rem and 3rem</button>
<button class="quiz-option" data-opt="c">C) Removes size</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> What does mobile-first mean?</p>
<button class="quiz-option" data-opt="a">A) Design for mobile first</button>
<button class="quiz-option" data-opt="b">B) Design for desktop first</button>
<button class="quiz-option" data-opt="c">C) Design only for mobile</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%205%3A%20Responsive%20Design&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F05-responsive%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F05-responsive%2F" target="_blank" rel="noopener">LinkedIn</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/05-responsive/" aria-label="Copy link">Copy link</button>
</div>