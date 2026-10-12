# Capítulo 24 — Animaciones avanzadas

## Introducción

Una animación bien hecha mejora la experiencia. Una mal hecha la arruina. Este capítulo cubre las técnicas que usan los equipos profesionales para animar interfaces fluidas, accesibles y con buen rendimiento.

## Principios de animación

Antes de tocar código, entiende **qué** comunicar:

- **Feedback**: confirmar que algo ha pasado (un botón pulsado).
- **Continuidad**: mostrar de dónde viene y a dónde va un elemento.
- **Jerarquía**: dirigir la atención a lo importante.
- **Personalidad**: dar carácter al producto.

### Los 12 principios (adaptados a UI)

Los 12 principios de la animación clásica (Disney) se aplican también a la web:

| Principio | En UI significa… |
|---|---|
| **Squash & stretch** | Botones que "rebotan" ligeramente al pulsar |
| **Anticipación** | Un modal que aparece desde abajo antes de mostrarse |
| **Staging** | Oscurecer el fondo al abrir un diálogo |
| **Follow through** | Un menú que se cierra con inercia |
| **Ease in/out** | Casi toda transición en UI |
| **Arcs** | Movimientos naturales, no lineales |
| **Timing** | 200-300 ms para transiciones típicas |
| **Exaggeration** | Ligeramente más dramático para que se note |
| **Solid drawing** | Formas coherentes y predecibles |
| **Appeal** | Que se sienta bien |

## Reglas de oro

- **150-300 ms** para transiciones de UI. Más rápido = brusco, más lento = pesado.
- **Ease-out** para entradas (rápido al principio, lento al final).
- **Ease-in** para salidas.
- **Ease-in-out** para cambios continuos.
- **Nunca animes `width`, `height`, `top`, `left`**. Usa `transform` y `opacity`.
- **Respeta `prefers-reduced-motion`**.
- **No animes todo**. Menos es más.

## Transiciones CSS

La forma más simple de animar cambios de estado.

```css
.boton {
  background: #6a5acd;
  transition: background 200ms ease-out, transform 150ms ease-out;
}

.boton:hover {
  background: #5b4bc4;
  transform: translateY(-2px);
}
```

### Timing functions

```css
transition-timing-function: ease;         /* por defecto */
transition-timing-function: ease-in;
transition-timing-function: ease-out;
transition-timing-function: ease-in-out;
transition-timing-function: linear;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-timing-function: steps(4, end);
```

### Cubic-bezier a medida

```css
/* "Back out": rebote al final */
transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);

/* "Expo out": muy suave al final */
transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
```

Puedes diseñarlas en [cubic-bezier.com](https://cubic-bezier.com/).

## `@keyframes`

Para animaciones más complejas.

```css
@keyframes girar {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: girar 1s linear infinite;
}
```

### Sintaxis completa

```css
.elemento {
  animation-name: entrar;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-delay: 100ms;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: both;
  animation-play-state: running;
}

/* Forma corta */
.elemento {
  animation: entrar 400ms cubic-bezier(0.16, 1, 0.3, 1) 100ms 1 normal both running;
}
```

### `animation-fill-mode`

- `none`: por defecto, vuelve al estado original.
- `forwards`: mantiene el estado final.
- `backwards`: aplica el estado inicial durante el delay.
- `both`: ambos.

## Transform: el rey del rendimiento

`transform` se ejecuta en la **GPU**, no en la CPU. Es la forma más rápida de mover cosas.

### Transformaciones básicas

```css
transform: translateX(100px);
transform: translateY(-50%);
transform: scale(1.2);
transform: rotate(45deg);
transform: skew(10deg);

/* Combinadas */
transform: translate(50px, 20px) rotate(15deg) scale(1.1);
```

!!! warning "El orden importa"
    `translate(...) rotate(...)` y `rotate(...) translate(...)` dan resultados distintos. Prueba ambos.

### `transform-origin`

Cambia el punto de referencia:

```css
transform-origin: center;   /* por defecto */
transform-origin: top left;
transform-origin: 50% 100%;
```

## `will-change`

Avisa al navegador de que un elemento **va a cambiar**, para que lo prepare con antelación.

```css
.menu {
  will-change: transform;
}
```

!!! warning "Úsalo con cabeza"
    Abusar de `will-change` **empeora** el rendimiento porque consume memoria. Úsalo solo en elementos que **realmente** van a animarse, y quítalo cuando termine.

## Web Animations API (WAAPI)

Alternativa a CSS con más control desde JavaScript.

```javascript
const elemento = document.querySelector('.caja');

elemento.animate(
  [
    { transform: 'translateX(0)', opacity: 1 },
    { transform: 'translateX(200px)', opacity: 0 },
  ],
  {
    duration: 400,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards',
  }
);
```

### Control total

```javascript
const animacion = elemento.animate(keyframes, opciones);

animacion.pause();
animacion.play();
animacion.reverse();
animacion.cancel();

animacion.onfinish = () => console.log('Terminada');
```

### Ventajas

- No requiere tocar CSS.
- Control en tiempo real.
- Se ejecuta en el compositor (rendimiento como CSS).
- Componible con `Promise` (`animacion.finished`).

## Transiciones entre estados con Vue/React

En **Vue**, el componente `<Transition>` gestiona clases automáticamente.

```vue
<template>
  <Transition name="fade">
    <div v-if="visible" class="modal">Contenido</div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

En **React**, usa `Framer Motion` o `react-transition-group`.

```jsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {visible && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      Contenido
    </motion.div>
  )}
</AnimatePresence>
```

## Animaciones basadas en scroll

### `IntersectionObserver`

Detecta cuándo un elemento entra en el viewport.

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // una sola vez
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animar').forEach((el) => observer.observe(el));
```

```css
.animar {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.animar.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### `scroll-timeline` (CSS)

Nueva API que permite ligar animaciones al scroll **sin JavaScript**.

```css
@keyframes entrar {
  from { opacity: 0; transform: translateY(50px); }
  to { opacity: 1; transform: translateY(0); }
}

.animar {
  animation: entrar linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 60%;
}
```

!!! info "Soporte"
    `scroll-timeline` está disponible en Chrome/Edge desde 2023. Firefox y Safari van llegando. Úsalo con `@supports` como mejora progresiva.

## View Transitions API

Permite transiciones fluidas **entre páginas** o entre estados sin JavaScript complejo.

```javascript
document.startViewTransition(() => {
  // Actualiza el DOM
  document.body.innerHTML = nuevoHTML;
});
```

```css
::view-transition-old(root) {
  animation: fade-out 300ms ease-out;
}

::view-transition-new(root) {
  animation: fade-in 300ms ease-in;
}
```

Ideal para SPAs, listas que se reordenan o modales que se expanden desde un botón.

## Animaciones de listas (FLIP)

**FLIP** = *First, Last, Invert, Play*. Técnica para animar cambios de posición de elementos.

1. **First**: guarda la posición inicial.
2. **Last**: cambia el DOM y guarda la posición final.
3. **Invert**: aplica un `transform` para simular que sigue en la posición inicial.
4. **Play**: quita el transform con una transición.

```javascript
function animarReordenado(contenedor) {
  const items = [...contenedor.children];

  const antes = new Map();
  items.forEach((el) => antes.set(el, el.getBoundingClientRect()));

  // ... reordena los items en el DOM ...

  items.forEach((el) => {
    const antesRect = antes.get(el);
    const despuesRect = el.getBoundingClientRect();

    const deltaX = antesRect.left - despuesRect.left;
    const deltaY = antesRect.top - despuesRect.top;

    if (deltaX || deltaY) {
      el.animate(
        [
          { transform: `translate(${deltaX}px, ${deltaY}px)` },
          { transform: 'translate(0, 0)' },
        ],
        { duration: 300, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
    }
  });
}
```

Framer Motion y Vue lo implementan por debajo.

## Microinteracciones

Pequeñas animaciones que dan vida a la interfaz:

- Un botón que se **hunde** al pulsarlo (`scale(0.96)`).
- Un icono que **gira** al pasar el ratón.
- Un check que **se dibuja** con `stroke-dasharray`.
- Un campo que **cambia de color** al enfocarlo.
- Un "me gusta" que **late** al pulsarlo.

```css
.boton:active {
  transform: scale(0.96);
  transition: transform 80ms;
}
```

```css
@keyframes latir {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.corazon.pulsado {
  animation: latir 300ms ease-out;
  color: #dc2626;
}
```

## Accesibilidad y `prefers-reduced-motion`

Nunca olvides respetar la preferencia del usuario.

```css
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
```

O selectivo: deja las animaciones sutiles y desactiva las grandes.

```css
@media (prefers-reduced-motion: reduce) {
  .animacion-grande { animation: none; }
}
```

## Rendimiento

### Qué es barato de animar

| Propiedad | Coste |
|---|---|
| `transform` | ⚡⚡⚡ GPU, muy rápido |
| `opacity` | ⚡⚡⚡ GPU, muy rápido |
| `filter` | ⚡⚡ GPU |
| `background-color` | ⚡ CPU |
| `width/height` | 🐌 Refow, lento |
| `top/left` | 🐌 Refow, lento |
| `box-shadow` | 🐌 Repaint, lento |

### Evita el "jank"

- **Anima solo `transform` y `opacity`**.
- **No animes `box-shadow`**. Usa un pseudo-elemento con `opacity`.
- **Usa `will-change` con moderación**.
- **Comprueba con DevTools** → Performance.

```css
/* ❌ Mal: repinta en cada frame */
.boton:hover {
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

/* ✅ Bien: sombra pre-renderizada, solo cambia opacidad */
.boton::after {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  opacity: 0;
  transition: opacity 200ms;
  border-radius: inherit;
  pointer-events: none;
}
.boton:hover::after {
  opacity: 1;
}
```

## Librerías recomendadas

- **[Motion One](https://motion.dev/)** — WAAPI con esteroides, ~3 KB.
- **[Framer Motion](https://www.framer.com/motion/)** — estándar en React.
- **[GSAP](https://gsap.com/)** — el más potente, ideal para animaciones complejas.
- **[AutoAnimate](https://auto-animate.formkit.com/)** — cero config, anima listas automáticamente.
- **[Lottie](https://airbnb.io/lottie/)** — animaciones vectoriales desde After Effects.

## Buenas prácticas

- **Empieza por entender el objetivo** antes de animar.
- **150-300 ms** para la mayoría de transiciones.
- **`ease-out` para entradas**, `ease-in` para salidas.
- **Anima `transform` y `opacity`**. Casi nunca otros.
- **Respeta `prefers-reduced-motion`**.
- **No animes en cascada 50 elementos**. Es mareante.
- **Prueba en móvil de gama baja**.
- **Un `<details>` no necesita 3 animaciones**.
- **Usa `will-change` solo cuando sea necesario**.

## Ejercicios

1. Crea un botón con hover y active usando solo `transform`.
2. Implementa un spinner de carga con `@keyframes`.
3. Anima la entrada de elementos al hacer scroll con `IntersectionObserver`.
4. Reproduce la animación "me gusta" con `scale` y `@keyframes`.
5. Usa la Web Animations API para reproducir una animación programáticamente.
6. Implementa un modal con transición de apertura y cierre.
7. Añade `prefers-reduced-motion` y comprueba que las animaciones se desactivan.
8. Mide el rendimiento en DevTools → Performance y anota el FPS.

---

⬅️ [Capítulo 23 — WebSockets](23-websockets.md) | ➡️ [Capítulo 25 — Design systems](25-design-systems.md)
