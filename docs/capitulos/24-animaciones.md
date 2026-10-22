# 24 — Animaciones avanzadas

!!! abstract "Qué vas a aprender"
    - Transiciones y animaciones CSS.
    - La Web Animations API.
    - Animaciones con scroll.
    - GSAP y Framer Motion.
    - Rendimiento en animaciones.

---

## 🎬 ¿Por qué importan las animaciones?

Las animaciones bien hechas **mejoran la UX**: guían la atención, dan feedback y hacen que la web se sienta viva. Las mal hechas distraen, marean y ralentizan.

!!! quote "La animación es comunicación"
    Una animación no es decoración: es una forma de decirle al usuario qué está pasando y qué puede hacer.

---

## ✨ Transiciones CSS

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

| Timing function | Comportamiento |
| :--- | :--- |
| `ease` | Suave al principio y al final (por defecto) |
| `linear` | Velocidad constante |
| `ease-in` | Lento al principio |
| `ease-out` | Lento al final |
| `ease-in-out` | Lento en ambos extremos |
| `cubic-bezier()` | Personalizado |

---

## 🎞️ Keyframes

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

### Stagger (escalonado)

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

La **Web Animations API** permite animar con JavaScript de forma más potente y controlable.

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

!!! tip "Ventajas de la WAAPI"
    - Control total desde JavaScript (play, pause, reverse, cancel).
    - Mejor rendimiento que animar propiedades con JS.
    - Se puede combinar con CSS.

---

## 📜 Animaciones con scroll

### Scroll-driven animations (nativo)

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

### Intersection Observer (más compatible)

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

**GSAP** (*GreenSock Animation Platform*) es la librería de animaciones más potente del mercado. Usada por Google, Apple, Netflix…

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

## ⚛️ Framer Motion (React)

**Framer Motion** es la librería de animaciones para React más popular.

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

## ⚡ Rendimiento en animaciones

No todas las propiedades CSS se animan igual de rápido:

| Propiedad | Rendimiento |
| :--- | :--- |
| `transform` | ⚡ Excelente (GPU) |
| `opacity` | ⚡ Excelente (GPU) |
| `filter` | 🚀 Bueno (GPU) |
| `width`, `height` | 🐢 Malo (repaint + layout) |
| `top`, `left` | 🐢 Malo (repaint + layout) |
| `background` | 🐢 Malo (repaint) |

!!! tip "Anima solo transform y opacity"
    Para animaciones fluidas a 60fps, anima **solo** `transform` y `opacity`. El resto provoca repaint y layout, que son mucho más costosos.

```css
/* Malo */
.caja:hover { left: 10px; }

/* Bueno */
.caja:hover { transform: translateX(10px); }
```

### Respetar prefers-reduced-motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

---

## ✅ Buenas prácticas

- ✅ **Anima con propósito**: guiar la atención, dar feedback.
- ✅ **Duración corta**: 200-500ms para la mayoría de interacciones.
- ✅ **Easing natural**: evita `linear` para movimientos.
- ✅ **Respeta `prefers-reduced-motion`**.
- ✅ **Usa GPU**: `transform` y `opacity`.
- ✅ **No abuses**: menos es más.
- ❌ **No animes `width`/`height`** si puedes evitarlo.
- ❌ **No hagas animaciones de más de 1s** en interacciones.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-24">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué propiedades CSS son más eficientes de animar?</p>
<button class="quiz-option" data-opt="a">A) width y height</button>
<button class="quiz-option" data-opt="b">B) transform y opacity</button>
<button class="quiz-option" data-opt="c">C) top y left</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> ¿Qué librería es la más potente para animaciones?</p>
<button class="quiz-option" data-opt="a">A) GSAP</button>
<button class="quiz-option" data-opt="b">B) jQuery</button>
<button class="quiz-option" data-opt="c">C) Bootstrap</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> ¿Qué API nativa permite animar con JavaScript?</p>
<button class="quiz-option" data-opt="a">A) Canvas</button>
<button class="quiz-option" data-opt="b">B) SVG</button>
<button class="quiz-option" data-opt="c">C) Web Animations API</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2024%3A%20Animaciones%20avanzadas&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F24-animaciones%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F24-animaciones%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2024%3A%20Animaciones%20avanzadas%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F24-animaciones%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/24-animaciones/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 25 — Design systems](25-design-systems.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
