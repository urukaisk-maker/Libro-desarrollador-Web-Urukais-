---
description: "Chapter 24 of the Web Developer's Book: 24 — Advanced Animations. Learn step by step with examples, exercises, and quizzes."
---
# 24 — Advanced Animations

!!! abstract "What you will learn"
    - CSS transitions and animations.
    - The Web Animations API.
    - Scroll animations.
    - GSAP and Framer Motion.
    - Animation performance.

---

## 🎬 Why Do Animations Matter?

Well-crafted animations **improve UX**: they guide attention, give feedback, and make the web feel alive. Poorly made ones distract, cause motion sickness, and slow things down.

!!! quote "Animation is communication"
    An animation isn't decoration—it's a way to tell the user what is happening and what they can do.

---

## ✨ CSS Transitions

```css
.boton {
  background: #6a5acd;
  transition: background-color .2s ease, transform .15s ease;
}

.boton:hover {
  background: #7d6ce0;
  transform: translateY(-2px);
}
```

| Timing function | Behavior |
| :--- | :--- |
| `ease` | Smooth start and end (default) |
| `linear` | Constant speed |
| `ease-in` | Slow start |
| `ease-out` | Slow end |
| `ease-in-out` | Slow at both ends |
| `cubic-bezier()` | Custom curve |

---

## 🎞 Keyframes

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animado {
  animation: fadeInUp .5s ease forwards;
}
```

### Stagger

```css
.lista > * {
  animation: fadeInUp .4s ease forwards;
  opacity: 0;
}

.lista > *:nth-child(1) { animation-delay: .05s; }
.lista > *:nth-child(2) { animation-delay: .1s; }
.lista > *:nth-child(3) { animation-delay: .15s; }
```

---

## ⚡ Web Animations API

The **Web Animations API** lets you animate with JavaScript in a more powerful and controllable way.

```javascript
const elemento = document.querySelector(".caja");

elemento.animate([
  { transform: "translateX(0)", opacity: 1 },
  { transform: "translateX(200px)", opacity: 0.5 }
], {
  duration: 500,
  easing: "ease-in-out",
  iterations: 1,
  fill: "forwards"
});
```

!!! tip "Advantages of WAAPI"
    - Full control from JavaScript (play, pause, reverse, cancel).
    - Better performance than animating properties manually with JS.
    - Can be combined with CSS.

---

## 📜 Scroll Animations

### Scroll-Driven Animations (Native)

```css
@keyframes aparecer {
  from { opacity: 0; transform: scale(.9); }
  to { opacity: 1; transform: scale(1); }
}

.elemento {
  animation: aparecer linear;
  animation-timeline: view();
  animation-range: entry 0% entry 50%;
}
```

### Intersection Observer (Broader Support)

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll(".animar").forEach((el) => observer.observe(el));
```

```css
.animar {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .5s, transform .5s;
}

.animar.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 🎬 GSAP

**GSAP** (*GreenSock Animation Platform*) is one of the most powerful animation libraries available. Used by Google, Apple, Netflix…

```bash
npm install gsap
```

```javascript
import gsap from "gsap";

gsap.to(".caja", {
  x: 200,
  rotation: 360,
  duration: 1,
  ease: "power2.out"
});
```

### Timeline

```javascript
const tl = gsap.timeline({ repeat: -1, yoyo: true });

tl.to(".caja", { x: 100, duration: .5 })
  .to(".caja", { y: 100, duration: .5 })
  .to(".caja", { x: 0, duration: .5 })
  .to(".caja", { y: 0, duration: .5 });
```

---

## ⚛ Framer Motion (React)

**Framer Motion** is the most popular animation library for React.

```bash
npm install framer-motion
```

```jsx
import { motion } from "framer-motion";

function MiComponente() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: .3 }}
    >
      Hola
    </motion.div>
  );
}
```

---

## ⚡ Animation Performance

Not all CSS properties animate at the same speed:

| Property | Performance |
| :--- | :--- |
| `transform` | ⚡ Excellent (GPU) |
| `opacity` | ⚡ Excellent (GPU) |
| `filter` | 🚀 Good (GPU) |
| `width`, `height` | 🐢 Poor (repaint + layout) |
| `top`, `left` | 🐢 Poor (repaint + layout) |
| `background` | 🐢 Poor (repaint) |

!!! tip "Animate only transform and opacity"
    For smooth 60fps animations, animate **only** `transform` and `opacity`. Everything else triggers repaint and layout, which are much more expensive.

```css
/* Bad */
.caja:hover { left: 10px; }

/* Good */
.caja:hover { transform: translateX(10px); }
```

### Respecting prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

---

## ✅ Best Practices

- ✅ **Animate with purpose**: guide attention, give feedback.
- ✅ **Short duration**: 200-500ms for most interactions.
- ✅ **Natural easing**: avoid `linear` for motion.
- ✅ **Respect `prefers-reduced-motion`**.
- ✅ **Use GPU**: `transform` and `opacity`.
- ✅ **Don't overdo it**: less is more.
- ❌ **Don't animate `width`/`height`** if you can avoid it.
- ❌ **Don't make interactions last longer than 1s**.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-24">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which CSS properties are most efficient to animate?</p>
<button class="quiz-option" data-opt="a">A) width and height</button>
<button class="quiz-option" data-opt="b">B) transform and opacity</button>
<button class="quiz-option" data-opt="c">C) top and left</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which library is most powerful for animations?</p>
<button class="quiz-option" data-opt="a">A) GSAP</button>
<button class="quiz-option" data-opt="b">B) jQuery</button>
<button class="quiz-option" data-opt="c">C) Bootstrap</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which native API lets you animate with JavaScript?</p>
<button class="quiz-option" data-opt="a">A) Canvas</button>
<button class="quiz-option" data-opt="b">B) SVG</button>
<button class="quiz-option" data-opt="c">C) Web Animations API</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2024%3A%20Advanced%20Animations&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F24-animaciones%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F24-animaciones%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2024%3A%20Advanced%20Animations%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F24-animaciones%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/24-animaciones/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 25 — Design systems](25-design-systems.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }



---

## 🎬 `@keyframes` in Depth

`@keyframes` define multi-step animations. Unlike `transition` (which animates between two states), `@keyframes` lets you control **every frame**.

### Basic Syntax

~~~css
@keyframes rebotar {
    0%   { transform: translateY(0); }
    50%  { transform: translateY(-30px); }
    100% { transform: translateY(0); }
}

.pelota {
    animation: rebotar 1s ease-in-out infinite;
}
~~~

### `animation` Properties

| Property | What it does | Example |
| :--- | :--- | :--- |
| `animation-name` | Name of the `@keyframes` | `rebotar` |
| `animation-duration` | Duration of one cycle | `1s`, `500ms` |
| `animation-timing-function` | Speed curve | `ease`, `linear`, `cubic-bezier(...)` |
| `animation-delay` | Initial delay | `200ms` |
| `animation-iteration-count` | Repetitions | `1`, `infinite`, `3` |
| `animation-direction` | Direction | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | State before/after | `none`, `forwards`, `backwards`, `both` |
| `animation-play-state` | Pause/resume | `running`, `paused` |

### `animation` Shorthand

~~~css
.pelota {
    animation: rebotar 1s ease-in-out 0s infinite alternate both;
    /* name duration timing delay iteration direction fill-mode */
}
~~~

!!! tip "`animation-fill-mode: both` is very useful"
    Keeps the first keyframe's state **before** the animation starts, and the last keyframe's state **after** it ends. Prevents visual "snapping" when the animation finishes.

---

## 🔄 `View Transitions API` (Modern CSS)

The **View Transitions API** lets you animate transitions between pages (or between states in an SPA) with very little code. The browser captures "before" and "after" snapshots and morphs between them automatically.

### Basic Usage in an SPA

~~~javascript
document.startViewTransition(() => {
    // Update the DOM here
    document.querySelector("#app").innerHTML = nuevaVista();
});
~~~

### Customizing the Transition with CSS

~~~css
::view-transition-old(root) {
    animation: fade-out 0.3s ease;
}

::view-transition-new(root) {
    animation: fade-in 0.3s ease;
}

@keyframes fade-out {
    to { opacity: 0; }
}

@keyframes fade-in {
    from { opacity: 0; }
}
~~~

### Transitioning a Specific Element

~~~css
/* Element moves smoothly across views */
.card {
    view-transition-name: card-principal;
}
~~~

~~~css
::view-transition-group(card-principal) {
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
~~~

!!! warning "Limited support"
    The View Transitions API works in **Chrome/Edge 111+** and **Safari 18+**. Firefox does not support it yet (2026). Use it with `@supports` or as progressive enhancement:

    ~~~css
    @supports (view-transition-name: none) {
        /* styles only if supported by the browser */
    }
    ~~~

---

## ♿ `prefers-reduced-motion` (Accessibility)

Some users have **motion sensitivity** (vertigo, epilepsy, migraines). Respect their system preference with a media query.

### Disabling Animations When Requested

~~~css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
~~~

### Alternative: Softer Animations

~~~css
@media (prefers-reduced-motion: no-preference) {
    .hero {
        animation: entrada 0.8s ease-out;
    }
}

/* If the user prefers reduced motion, no animation */
@media (prefers-reduced-motion: reduce) {
    .hero {
        opacity: 1;
        transform: none;
    }
}
~~~

!!! tip "It's a requirement, not an extra"
    WCAG 2.2 includes `prefers-reduced-motion` as a conformance criterion (2.3.3). If your site has animations, you **must** respect this preference.

---

## ⚡ Performant Animations

Not all CSS properties animate the same way. Some force the browser to **recalculate layout** (slow), others only repaint, and others animate on the **GPU** (fast).

| Property | Cost | Why |
| :--- | :--- | :--- |
| `transform` | ⚡ **GPU** | Animated on the graphics card |
| `opacity` | ⚡ **GPU** | Also animated on the GPU |
| `background-color` | 🚀 Repaint | Repaints the element |
| `width`, `height` | 🐢 **Reflow** | Recalculates layout |
| `top`, `left` | 🐢 **Reflow** | Recalculates layout |
| `margin`, `padding` | 🐢 **Reflow** | Recalculates layout |

### Golden Rule: Animate Only `transform` and `opacity`

~~~css
/* ✅ Good: GPU, no reflow */
.boton:hover {
    transform: scale(1.05);
    opacity: 0.9;
}

/* ❌ Bad: reflow on every frame */
.boton:hover {
    width: 110%;
    height: 110%;
    top: -5px;
}
~~~

### `will-change` (In Moderation)

~~~css
.elemento-que-va-a-animarse {
    will-change: transform;
}
~~~

!!! warning "Don't overuse `will-change`"
    Creates a compositing layer on the GPU. Putting it on many elements consumes video memory and **hurts** performance. Use it only on elements about to animate, and remove it once the animation finishes.

---

## 📜 `scroll-driven animations` (Modern CSS)

Lets you animate elements **based on scroll**, without JavaScript. There are two types:

### 1. `animation-timeline: scroll()` — Based on a Container's Scroll

~~~css
.barra-progreso {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: #6a5acd;
    transform-origin: left;
    animation: crecer linear;
    animation-timeline: scroll(root);
}

@keyframes crecer {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
}
~~~

### 2. `animation-timeline: view()` — Based on an Element's Visibility

~~~css
.tarjeta {
    animation: aparecer linear both;
    animation-timeline: view();
    animation-range: entry 0% entry 100%;
}

@keyframes aparecer {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
}
~~~

!!! tip "Less JavaScript, more CSS"
    Scroll-driven animations replace most "reveal on scroll" libraries (AOS, ScrollReveal). They work in Chrome/Edge 115+ and Safari 26+ (2026). Firefox not yet.

---

## 🧪 Hands-On Exercise

!!! example "Entrance animation respecting `prefers-reduced-motion`"
    Create a card that:

    - Appears with a `fade-in` + `translateY` on page load.
    - Uses `@keyframes` with a 0.6s duration.
    - **Disables** the animation if the user has `prefers-reduced-motion: reduce`.

??? success "Solution"
    ~~~css
    .tarjeta {
        opacity: 0;
        transform: translateY(20px);
        animation: entrada 0.6s ease-out forwards;
    }

    @keyframes entrada {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .tarjeta {
            animation: none;
            opacity: 1;
            transform: none;
        }
    }
    ~~~

---

## 🧠 Review Quiz

!!! question "Check what you learned"

??? success "1. What is the difference between `transition` and `animation`?"
    `transition` animates between **two states** (start and end) when a property changes. `animation` uses `@keyframes` and allows **multiple steps**, repetition, direction, and full control.

??? success "2. Which CSS properties are animated on the GPU?"
    `transform` and `opacity`. They are the only ones that don't cause reflow or repaint. Animating `width`, `top`, or `margin` forces the browser to recalculate layout on every frame.

??? success "3. What is `prefers-reduced-motion` for?"
    To respect users with motion sensitivity (vertigo, epilepsy). When enabled, animations should be disabled or reduced. It is a WCAG accessibility criterion.

??? success "4. What does `animation-fill-mode: both` do?"
    Keeps the first keyframe's state **before** the animation starts and the last keyframe's state **after** it ends. Prevents visual jumps.

??? success "5. What advantage do scroll-driven animations have?"
    They let you animate based on scroll **without JavaScript**, replacing libraries like AOS. They are declared with `animation-timeline: scroll()` or `view()`.

---

## 📚 Resources

- [MDN — `@keyframes`](https://developer.mozilla.org/es/docs/Web/CSS/@keyframes)
- [MDN — `animation`](https://developer.mozilla.org/es/docs/Web/CSS/animation)
- [MDN — `prefers-reduced-motion`](https://developer.mozilla.org/es/docs/Web/CSS/@media/prefers-reduced-motion)
- [Chrome Developers — View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions)
- [Chrome Developers — Scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [web.dev — Animations performantes](https://web.dev/animations-guide/)
- [WCAG 2.2 — 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

---

➡ Next chapter: [25 — Design systems](25-design-systems.md)