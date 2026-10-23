# 11 — CSS moderno

!!! abstract "Qué vas a aprender"
    - Variables CSS y funciones modernas.
    - Selectores avanzados: :has(), :is(), :where().
    - Container queries.
    - Grid avanzado y subgrid.
    - Animaciones y transiciones.

---

## 🎨 CSS ya no es lo que era

CSS ha evolucionado muchísimo en los últimos años. Lo que antes requería JavaScript o preprocesadores ahora es nativo: variables, anidamiento, funciones matemáticas, container queries…

!!! quote "CSS es un lenguaje de programación (casi)"
    Aunque no tiene bucles ni funciones como JavaScript, CSS moderno tiene variables, condicionales (con @supports y media queries) y funciones. Es mucho más potente de lo que parece.

---

## 🔤 Variables CSS

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

### Ventajas

- **Tematización**: cambia una variable y se actualiza todo.
- **Modo oscuro**: redefine las variables en \`[data-theme="dark"]\`.
- **Legibilidad**: nombres descriptivos en lugar de valores mágicos.

```css
[data-theme="dark"] {
  --primario: #a78bfa;
  --acento: #22d3ee;
}
```

---

## 🧮 Funciones modernas

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

\`clamp(min, ideal, max)\` es perfecto para tipografía fluida.

### min() y max()

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

## 🎯 Selectores avanzados

### :is()

```css
:is(h1, h2, h3) {
  line-height: 1.2;
}
```

### :where()

Igual que \`:is()\`, pero con **especificidad 0**:

```css
:where(h1, h2, h3) {
  margin: 0;
}
```

### :has()

Selecciona un elemento que **contiene** otro:

```css
.card:has(img) {
  grid-template-columns: 200px 1fr;
}

.form:has(input:invalid) {
  border-color: red;
}
```

!!! tip ":has() es un cambio de juego"
    Antes necesitabas JavaScript para aplicar estilos a un padre según sus hijos. Con \`:has()\` es CSS puro. Ya está soportado en todos los navegadores modernos.

### :not()

```css
.boton:not(.boton--disabled) {
  cursor: pointer;
}
```

---

## 📐 Container queries

Las **container queries** permiten aplicar estilos según el tamaño del **contenedor**, no del viewport.

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

!!! quote "El fin de los media queries para componentes"
    Los media queries siguen siendo útiles para layouts de página. Pero para componentes reutilizables, las container queries son mucho más potentes: un mismo componente puede verse distinto según el espacio que tenga.

---

## 🔲 Grid avanzado

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
/* auto-fit: las columnas vacías colapsan */
.grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }

/* auto-fill: las columnas vacías se mantienen */
.grid { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
```

---

## ✨ Animaciones y transiciones

### Transiciones

```css
.boton {
  transition: background-color .2s ease, transform .15s ease;
}

.boton:hover {
  background-color: var(--acento);
  transform: translateY(-2px);
}
```

### Animaciones con keyframes

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animado {
  animation: fadeIn .4s ease forwards;
}
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

!!! warning "Accesibilidad en animaciones"
    Algunas personas sufren mareos con animaciones. Respeta \`prefers-reduced-motion\` siempre que puedas.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-11">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Cómo se declara una variable CSS?</p>
<button class="quiz-option" data-opt="a">A) : valor;</button>
<button class="quiz-option" data-opt="b">B) --variable: valor;</button>
<button class="quiz-option" data-opt="c">C) var variable = valor;</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> ¿Qué selector aplica estilos a un padre que contiene un hijo concreto?</p>
<button class="quiz-option" data-opt="a">A) :is()</button>
<button class="quiz-option" data-opt="b">B) :where()</button>
<button class="quiz-option" data-opt="c">C) :has()</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> ¿Qué función limita un valor entre un mínimo y un máximo?</p>
<button class="quiz-option" data-opt="a">A) clamp()</button>
<button class="quiz-option" data-opt="b">B) calc()</button>
<button class="quiz-option" data-opt="c">C) minmax()</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%2011%3A%20CSS%20moderno&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F11-css-moderno%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F11-css-moderno%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%2011%3A%20CSS%20moderno%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F11-css-moderno%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/11-css-moderno/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 12 — JavaScript asíncrono](12-javascript-asincrono.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
