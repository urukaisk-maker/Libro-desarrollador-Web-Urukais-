# Ejercicios resueltos — Capítulo 24

[Volver al índice](index.md) · [Capítulo original](../capitulos/24-animaciones.md)

## Ejercicio 1: Botón con hover y active

> Crea un botón con hover y active usando solo `transform`.

### Solución

```css
.boton {
  background: #6a5acd;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms ease-out, background 150ms ease-out;
}

.boton:hover {
  background: #5b4bc4;
  transform: translateY(-2px);
}

.boton:active {
  transform: scale(0.96);
}

.boton:focus-visible {
  outline: 3px solid #a78bfa;
  outline-offset: 2px;
}
```

**Clave:** `transform` y `background` se ejecutan en la GPU, mucho más rápido que `top`/`left`/`box-shadow`.

---

## Ejercicio 2: Spinner con `@keyframes`

> Implementa un spinner de carga.

### Solución

```css
@keyframes girar {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #6a5acd;
  border-radius: 50%;
  animation: girar 800ms linear infinite;
}

/* Con prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 2s;
  }
}
```

---

## Ejercicio 3: Entrada al hacer scroll

> Anima la entrada de elementos al hacer scroll con `IntersectionObserver`.

### Solución

```html
<div class="animar">Contenido 1</div>
<div class="animar">Contenido 2</div>
<div class="animar">Contenido 3</div>
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

@media (prefers-reduced-motion: reduce) {
  .animar {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

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

---

## Ejercicio 4: "Me gusta" con `@keyframes`

> Reproduce la animación "me gusta".

### Solución

```html
<button class="corazon" aria-label="Me gusta">❤</button>
```

```css
.corazon {
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #94a3b8;
  transition: color 200ms;
}

.corazon.pulsado {
  color: #dc2626;
}

@keyframes latir {
  0%, 100% { transform: scale(1); }
  30% { transform: scale(1.4); }
  60% { transform: scale(0.9); }
}

.corazon.pulsado {
  animation: latir 400ms ease-out;
}
```

```javascript
const btn = document.querySelector('.corazon');
btn.addEventListener('click', () => {
  btn.classList.toggle('pulsado');
  // Reinicia la animación
  btn.style.animation = 'none';
  void btn.offsetWidth;
  btn.style.animation = '';
});
```

---

## Ejercicio 5: Web Animations API

> Reproduce una animación programáticamente.

### Solución

```javascript
const caja = document.querySelector('.caja');

const animacion = caja.animate(
  [
    { transform: 'translateX(0)', opacity: 1 },
    { transform: 'translateX(200px)', opacity: 0.5 },
    { transform: 'translateX(0)', opacity: 1 },
  ],
  {
    duration: 800,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    fill: 'forwards',
  }
);

animacion.onfinish = () => console.log('Terminada');

// Control
// animacion.pause();
// animacion.play();
// animacion.reverse();
// animacion.cancel();
```

**Ventajas:**
- Control total desde JavaScript.
- `Promise` con `animacion.finished`.
- Mismo rendimiento que CSS (corre en el compositor).

---

## Ejercicio 6: Modal con transición

> Implementa un modal con apertura y cierre.

### Solución

```html
<button id="abrir">Abrir modal</button>

<div class="modal-backdrop" hidden>
  <div class="modal" role="dialog" aria-modal="true">
    <h2>Modal</h2>
    <p>Contenido del modal.</p>
    <button id="cerrar">Cerrar</button>
  </div>
</div>
```

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.7);
  display: grid;
  place-items: center;
  opacity: 0;
  transition: opacity 300ms ease-out;
  z-index: 100;
}

.modal-backdrop.abierto {
  opacity: 1;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  transform: translateY(20px) scale(0.98);
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-backdrop.abierto .modal {
  transform: translateY(0) scale(1);
}
```

```javascript
const backdrop = document.querySelector('.modal-backdrop');
const abrir = document.getElementById('abrir');
const cerrar = document.getElementById('cerrar');

function abrirModal() {
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add('abierto'));
}

function cerrarModal() {
  backdrop.classList.remove('abierto');
  setTimeout(() => backdrop.hidden = true, 300);
}

abrir.addEventListener('click', abrirModal);
cerrar.addEventListener('click', cerrarModal);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !backdrop.hidden) cerrarModal();
});
```

---

## Ejercicio 7: `prefers-reduced-motion`

> Añade y comprueba que las animaciones se desactivan.

### Solución

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

**Cómo probarlo:**

- **Chrome**: DevTools → Menú (⋯) → More tools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`.
- **Firefox**: `about:config` → `ui.prefersReducedMotion` = 1.
- **macOS/iOS**: Ajustes → Accesibilidad → Movimiento → Reducir movimiento.
- **Windows**: Configuración → Accesibilidad → Efectos visuales → desactivar animaciones.

---

## Ejercicio 8: Mide rendimiento

> Mide el rendimiento en DevTools.

### Solución

1. Abre DevTools → **Performance**.
2. Graba mientras animas algo.
3. Comprueba:
   - **FPS**: verde arriba = 60 fps estables.
   - **CPU**: por debajo del 50%.
   - **Layout shifts**: no debe haber "purple bars" grandes (refow).

**Reglas para 60 fps:**

- Anima solo `transform` y `opacity`.
- Evita `width`, `height`, `top`, `left`, `box-shadow`.
- Usa `will-change: transform` solo cuando sea necesario.
- No animes más de 5-10 elementos a la vez.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/24-animaciones.md)
