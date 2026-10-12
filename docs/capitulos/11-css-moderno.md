# Capítulo 11 — CSS moderno

## Introducción

El CSS que se escribe hoy en producción ya no se parece al de hace cinco años. Nuevas características del lenguaje permiten escribir estilos **más expresivos, mantenibles y potentes** sin necesidad de preprocesadores ni frameworks.

Este capítulo repasa las técnicas que todo desarrollador profesional debería dominar en 2026.

## Variables CSS (custom properties)

A diferencia de las variables de SCSS, las **custom properties** existen en tiempo de ejecución y se pueden modificar con JavaScript o con media queries.

```css
:root {
  --color-primary: #6a5acd;
  --color-text: #1e293b;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --radius: 12px;
}

.button {
  background: var(--color-primary);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius);
}
```

### Cambiar tema con variables

```css
:root {
  --bg: #ffffff;
  --text: #1e293b;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #e2e8f0;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

Con JavaScript, cambiar el tema es solo:

```javascript
document.documentElement.dataset.theme = 'dark';
```

!!! tip "Fallback de variables"
    Puedes dar un valor por defecto: `var(--color, #333)`. Útil cuando la variable puede no estar definida.

## Funciones modernas: `clamp()`, `min()` y `max()`

Permiten escribir **tipografía y espaciados fluidos** sin media queries.

```css
/* Título que escala entre 1.5rem y 3rem según el viewport */
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
}

/* Ancho que nunca supera los 800px */
.container {
  width: min(100% - 2rem, 800px);
  margin-inline: auto;
}

/* Padding mínimo garantizado */
.card {
  padding: max(1rem, 2vw);
}
```

## Selectores `:is()` y `:where()`

Simplifican listas largas de selectores y mejoran la legibilidad.

```css
/* Antes */
article h1, article h2, article h3 { margin-top: 0; }

/* Ahora */
article :is(h1, h2, h3) { margin-top: 0; }
```

`:where()` hace lo mismo, pero con **especificidad cero**. Perfecto para resets:

```css
:where(ul, ol) {
  list-style: none;
  padding: 0;
}
```

## El selector `:has()` — el "selector padre"

` :has()` permite estilizar un elemento **en función de sus hijos**. Es una de las novedades más potentes de los últimos años.

```css
/* Tarjeta con imagen */
.card:has(img) {
  grid-template-rows: auto 1fr;
}

/* Formulario con error */
.form:has(input:invalid) {
  border-color: crimson;
}

/* Menú con submenú abierto */
.nav-item:has(> .submenu:hover) {
  background: #f1f5f9;
}
```

!!! info "Soporte"
    `:has()` está soportado en todos los navegadores modernos desde 2023. Puedes usarlo en producción sin problema.

## Container queries

Antes, el diseño responsive dependía del tamaño del **viewport**. Con `@container`, un componente responde al tamaño de **su contenedor**.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: 1rem;
}

/* Cuando el contenedor supera los 400px */
@container card (min-width: 400px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}
```

Esto permite **componentes verdaderamente reutilizables** en cualquier contexto.

## Cascade layers (`@layer`)

Controlan el orden de precedencia de los estilos sin depender de la especificidad.

```css
@layer reset, base, components, utilities;

@layer reset {
  * { box-sizing: border-box; }
}

@layer base {
  body { font-family: system-ui; }
}

@layer utilities {
  .text-center { text-align: center; }
}
```

El orden de las capas importa más que la especificidad dentro de ellas. Ideal para trabajar con librerías externas sin pelearse con sus estilos.

## `@scope`

Limita el alcance de los estilos a un subárbol del DOM.

```css
@scope (.card) to (.card-footer) {
  img { border-radius: 12px; }
  p { color: #475569; }
}
```

Los estilos solo se aplican dentro de `.card` y **no** dentro de `.card-footer`.

## Subgrid

Hereda la cuadrícula del elemento padre, algo imposible con grid normal.

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  display: grid;
  grid-column: span 3;
  grid-template-columns: subgrid;
}
```

Perfecto para alinear contenido entre tarjetas.

## Colores modernos: `oklch()` y `color-mix()`

```css
:root {
  --brand: oklch(60% 0.18 280);
  --brand-light: color-mix(in oklch, var(--brand) 30%, white);
  --brand-dark: color-mix(in oklch, var(--brand) 70%, black);
}
```

`oklch()` ofrece **percepción uniforme del color**, ideal para generar paletas consistentes.

## Propiedades lógicas

Sustituyen `left/right/top/bottom` por `inline-start`, `inline-end`, `block-start`, `block-end`. Esencial para internacionalización (RTL, árabe, hebreo).

```css
.card {
  margin-inline: auto;
  padding-block: 1rem;
  border-inline-start: 2px solid var(--brand);
}
```

## `aspect-ratio`

Antes se usaba el truco del `padding-top: 56.25%`. Ahora:

```css
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

## Caso real: tarjeta de producto responsive

```html
<article class="product">
  <img src="camiseta.jpg" alt="Camiseta">
  <div class="product-info">
    <h3>Camiseta</h3>
    <p class="price">29 €</p>
    <button>Añadir al carrito</button>
  </div>
</article>
```

```css
.product {
  container-type: inline-size;
  display: grid;
  gap: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  background: var(--bg, white);
}

.product:has(.price:empty) {
  opacity: 0.5;
}

@container (min-width: 400px) {
  .product {
    grid-template-columns: 120px 1fr;
    align-items: center;
  }
}

.price {
  font-weight: 700;
  color: var(--brand, #6a5acd);
}
```

## Buenas prácticas

- **Usa variables CSS** para todo lo que se repita: colores, espaciados, radios, tipografías.
- **Combina `:is()` y `:where()`** para reducir ruido en los selectores.
- **Prefiere `container queries`** a media queries cuando diseñes componentes.
- **Organiza con `@layer`** para separar resets, base, componentes y utilidades.
- **Usa `clamp()`** para tipografía fluida y `min()`/`max()` para tamaños con límites.
- **Adopta propiedades lógicas** desde el principio; evita refactorizar después.
- **Comprueba compatibilidad** en [caniuse.com](https://caniuse.com/) antes de usar features muy nuevas.

## Ejercicios

1. Crea un sistema de temas (claro/oscuro) usando solo custom properties.
2. Diseña una tarjeta que cambie de layout según el ancho de su contenedor con `@container`.
3. Usa `:has()` para resaltar un formulario cuando tiene un campo inválido.
4. Implementa un título con tipografía fluida usando `clamp()`.
5. Organiza tus estilos con `@layer` en cuatro capas: reset, base, components y utilities.

---

⬅️ [Capítulo 10 — Proyecto final](../capitulos/10-proyecto-final.md) | ➡️ Capítulo 12 — JavaScript asíncrono (pendiente)python3 -c "print(open('docs/capitulos/11-css-moderno.md').read()[:200])"
