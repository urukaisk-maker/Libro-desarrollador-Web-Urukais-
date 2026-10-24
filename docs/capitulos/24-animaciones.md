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


---

## 🎬 `@keyframes` en profundidad

Los `@keyframes` definen animaciones con múltiples pasos. A diferencia de `transition` (que anima entre dos estados), `@keyframes` permite controlar **cada fotograma**.

### Sintaxis básica

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

### Propiedades de `animation`

| Propiedad | Qué hace | Ejemplo |
| :--- | :--- | :--- |
| `animation-name` | Nombre del `@keyframes` | `rebotar` |
| `animation-duration` | Duración de un ciclo | `1s`, `500ms` |
| `animation-timing-function` | Curva de velocidad | `ease`, `linear`, `cubic-bezier(...)` |
| `animation-delay` | Retardo inicial | `200ms` |
| `animation-iteration-count` | Repeticiones | `1`, `infinite`, `3` |
| `animation-direction` | Dirección | `normal`, `reverse`, `alternate` |
| `animation-fill-mode` | Estado antes/después | `none`, `forwards`, `backwards`, `both` |
| `animation-play-state` | Pausar/reanudar | `running`, `paused` |

### Atajo `animation`

~~~css
.pelota {
    animation: rebotar 1s ease-in-out 0s infinite alternate both;
    /* nombre duración timing delay iteración dirección fill-mode */
}
~~~

!!! tip "`animation-fill-mode: both` es muy útil"
    Mantiene el estado del primer keyframe **antes** de que empiece la animación, y el del último **después** de que termine. Evita el "salto" visual cuando la animación acaba.

---

## 🔄 `View Transitions API` (CSS moderno)

La **View Transitions API** permite animar transiciones entre páginas (o entre estados de una SPA) con muy poco código. El navegador captura el "antes" y el "después", y hace el morphing automáticamente.

### Uso básico en una SPA

~~~javascript
document.startViewTransition(() => {
    // Cambiar el DOM aquí
    document.querySelector("#app").innerHTML = nuevaVista();
});
~~~

### Personalizar la transición con CSS

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

### Transición de un elemento concreto

~~~css
/* El elemento se mueve suavemente entre páginas */
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

!!! warning "Soporte limitado"
    La View Transitions API funciona en **Chrome/Edge 111+** y **Safari 18+**. Firefox aún no la soporta (2026). Úsala con `@supports` o como mejora progresiva:

    ~~~css
    @supports (view-transition-name: none) {
        /* estilos solo si el navegador lo soporta */
    }
    ~~~

---

## ♿ `prefers-reduced-motion` (accesibilidad)

Hay usuarios con **sensibilidad al movimiento** (vértigo, epilepsia, migrañas). Respeta su preferencia del sistema con una media query.

### Desactivar animaciones si el usuario lo pide

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

### Alternativa: animaciones más suaves

~~~css
@media (prefers-reduced-motion: no-preference) {
    .hero {
        animation: entrada 0.8s ease-out;
    }
}

/* Si el usuario prefiere menos movimiento, sin animación */
@media (prefers-reduced-motion: reduce) {
    .hero {
        opacity: 1;
        transform: none;
    }
}
~~~

!!! tip "Es una obligación, no un extra"
    La WCAG 2.2 incluye `prefers-reduced-motion` como criterio de conformidad (2.3.3). Si tu web tiene animaciones, **debes** respetar esta preferencia.

---

## ⚡ Animaciones performantes

No todas las propiedades CSS se animan igual. Algunas obligan al navegador a **recalcular el layout** (lentas), otras solo repintan, y otras se animan en la **GPU** (rápidas).

| Propiedad | Coste | Por qué |
| :--- | :--- | :--- |
| `transform` | ⚡ **GPU** | Se anima en la tarjeta gráfica |
| `opacity` | ⚡ **GPU** | Igual, se anima en la GPU |
| `background-color` | 🚀 Repaint | Repinta el elemento |
| `width`, `height` | 🐢 **Reflow** | Recalcula el layout |
| `top`, `left` | 🐢 **Reflow** | Recalcula el layout |
| `margin`, `padding` | 🐢 **Reflow** | Recalcula el layout |

### Regla de oro: anima solo `transform` y `opacity`

~~~css
/* ✅ Bien: GPU, sin reflow */
.boton:hover {
    transform: scale(1.05);
    opacity: 0.9;
}

/* ❌ Mal: reflow en cada frame */
.boton:hover {
    width: 110%;
    height: 110%;
    top: -5px;
}
~~~

### `will-change` (con moderación)

~~~css
.elemento-que-va-a-animarse {
    will-change: transform;
}
~~~

!!! warning "No abuses de `will-change`"
    Crea una capa de composición en la GPU. Si lo pones en muchos elementos, consumes memoria de vídeo y el rendimiento **empeora**. Úsalo solo en elementos que realmente van a animarse, y quítalo cuando termine la animación.

---

## 📜 `scroll-driven animations` (CSS moderno)

Permite animar elementos **según el scroll**, sin JavaScript. Hay dos tipos:

### 1. `animation-timeline: scroll()` — según el scroll de un contenedor

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

### 2. `animation-timeline: view()` — según la visibilidad de un elemento

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

!!! tip "Menos JavaScript, más CSS"
    Las scroll-driven animations sustituyen a la mayoría de librerías de "reveal on scroll" (AOS, ScrollReveal). Funcionan en Chrome/Edge 115+ y Safari 26+ (2026). Firefox aún no.

---

## 🧪 Ejercicio práctico

!!! example "Animación de entrada con respeto a `prefers-reduced-motion`"
    Crea una tarjeta que:

    - Aparezca con un `fade-in` + `translateY` al cargar la página.
    - Use `@keyframes` con duración de 0.6s.
    - Se **desactive** si el usuario tiene `prefers-reduced-motion: reduce`.

??? success "Solución"
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

## 🧠 Quiz de repaso

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué diferencia hay entre `transition` y `animation`?"
    `transition` anima entre **dos estados** (inicial y final) cuando cambia una propiedad. `animation` usa `@keyframes` y permite **múltiples pasos**, repetición, dirección y control total.

??? success "2. ¿Qué propiedades CSS se animan en la GPU?"
    `transform` y `opacity`. Son las únicas que no provocan reflow ni repaint. Animar `width`, `top` o `margin` obliga al navegador a recalcular el layout en cada frame.

??? success "3. ¿Para qué sirve `prefers-reduced-motion`?"
    Para respetar a los usuarios con sensibilidad al movimiento (vértigo, epilepsia). Si lo tienen activado, hay que desactivar o reducir las animaciones. Es un criterio de accesibilidad WCAG.

??? success "4. ¿Qué hace `animation-fill-mode: both`?"
    Mantiene el estado del primer keyframe **antes** de que empiece la animación y el del último **después** de que termine. Evita saltos visuales.

??? success "5. ¿Qué ventaja tienen las scroll-driven animations?"
    Permiten animar según el scroll **sin JavaScript**, sustituyendo librerías como AOS. Se declaran con `animation-timeline: scroll()` o `view()`.

---

## 📚 Recursos

- [MDN — `@keyframes`](https://developer.mozilla.org/es/docs/Web/CSS/@keyframes)
- [MDN — `animation`](https://developer.mozilla.org/es/docs/Web/CSS/animation)
- [MDN — `prefers-reduced-motion`](https://developer.mozilla.org/es/docs/Web/CSS/@media/prefers-reduced-motion)
- [Chrome Developers — View Transitions API](https://developer.chrome.com/docs/web-platform/view-transitions)
- [Chrome Developers — Scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [web.dev — Animations performantes](https://web.dev/animations-guide/)
- [WCAG 2.2 — 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

---

➡️ Siguiente capítulo: [25 — Design systems](25-design-systems.md)



