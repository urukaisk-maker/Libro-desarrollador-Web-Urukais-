# Ejercicios resueltos — Capítulo 5

[Volver al índice](index.md) · [Capítulo original](../capitulos/05-responsive.md)

## Ejercicio 1: Tarjeta con layout adaptativo

> Crea una tarjeta que cambie de una columna (móvil) a dos (desktop).

### Solución

```css
.tarjeta {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
}

@media (min-width: 640px) {
  .tarjeta {
    grid-template-columns: 200px 1fr;
    align-items: center;
  }
}
```

**Explicación:**
- Mobile-first: por defecto una columna.
- `@media (min-width: 640px)` añade la segunda columna.
- `1fr` → ocupa el espacio disponible.

---

## Ejercicio 2: Centrado con Flexbox

> Usa Flexbox para centrar un elemento vertical y horizontalmente.

### Solución

```css
.contenedor {
  display: flex;
  justify-content: center;   /* horizontal */
  align-items: center;       /* vertical */
  min-height: 100vh;
  background: #f8fafc;
}

.contenido {
  text-align: center;
}
```

```html
<div class="contenedor">
  <div class="contenido">
    <h1>Centrado</h1>
    <p>Con Flexbox es trivial.</p>
  </div>
</div>
```

**Explicación:**
- `min-height: 100vh` → altura mínima de la pantalla completa.
- `justify-content` → eje principal (horizontal por defecto).
- `align-items` → eje cruzado (vertical).

---

## Ejercicio 3: Cuadrícula responsive

> Crea una cuadrícula de 3 columnas que se convierta en 1 en móvil.

### Solución

```css
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 960px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

**Alternativa sin media queries: `auto-fit` + `minmax`:**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

Esta versión se adapta sola sin media queries.

---

## Ejercicio 4: Tipografía fluida

> Crea un título con tipografía fluida usando `clamp()`.

### Solución

```css
h1 {
  font-size: clamp(1.5rem, 4vw + 1rem, 3rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

**Explicación:**
- `clamp(min, ideal, max)` → 1.5rem mínimo, 3rem máximo.
- `4vw + 1rem` → crece con el viewport pero no linealmente.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/05-responsive.md)
