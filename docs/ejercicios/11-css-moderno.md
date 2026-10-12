# Ejercicios resueltos — Capítulo 11

[Volver al índice](index.md) · [Capítulo original](../capitulos/11-css-moderno.md)

## Ejercicio 1: Sistema de temas con custom properties

> Crea un sistema de temas (claro/oscuro) usando solo custom properties.

### Solución

```css
:root {
  --bg: #ffffff;
  --surface: #f8fafc;
  --text: #1e293b;
  --muted: #64748b;
  --border: #e2e8f0;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --surface: #1e293b;
  --text: #e2e8f0;
  --muted: #94a3b8;
  --border: #334155;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 300ms, color 300ms;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
}
```

```javascript
document.documentElement.dataset.theme =
  localStorage.getItem('tema') || 'light';
```

---

## Ejercicio 2: Tarjeta con `@container`

> Diseña una tarjeta que cambie de layout según el ancho de su contenedor.

### Solución

```css
.tarjeta-wrapper {
  container-type: inline-size;
  container-name: tarjeta;
}

.tarjeta {
  display: grid;
  gap: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
}

@container tarjeta (min-width: 400px) {
  .tarjeta {
    grid-template-columns: 120px 1fr;
    align-items: center;
  }
}
```

**Explicación:** La tarjeta se adapta a **su contenedor**, no al viewport. Reutilizable en cualquier contexto.

---

## Ejercicio 3: `:has()` para formularios

> Resalta un formulario cuando tiene un campo inválido.

### Solución

```css
.formulario:has(input:invalid) {
  border-color: #dc2626;
  background: #fef2f2;
}

.formulario:has(input:valid) button[type="submit"] {
  opacity: 1;
  pointer-events: auto;
}

.formulario button[type="submit"] {
  opacity: 0.5;
  pointer-events: none;
  transition: opacity 200ms;
}
```

---

## Ejercicio 4: Tipografía fluida

> Implementa un título con tipografía fluida usando `clamp()`.

### Solución

```css
h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

h2 {
  font-size: clamp(1.25rem, 2vw + 0.75rem, 2rem);
}

p {
  font-size: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
}
```

---

## Ejercicio 5: Capas con `@layer`

> Organiza tus estilos en 4 capas: reset, base, components y utilities.

### Solución

```css
@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.6;
  }
  a { color: #6a5acd; }
}

@layer components {
  .btn {
    background: #6a5acd;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 8px;
  }
}

@layer utilities {
  .text-center { text-align: center; }
  .mt-4 { margin-top: 1rem; }
}
```

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/11-css-moderno.md)
