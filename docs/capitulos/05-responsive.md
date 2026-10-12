# Capítulo 5 — Diseño responsive

## ¿Qué es el diseño responsive?

El diseño responsive (o adaptativo) consiste en crear páginas que se ven bien en **cualquier tamaño de pantalla**: móvil, tablet, portátil, monitor grande.

## La meta etiqueta viewport

Es la línea más importante para que una web funcione en móvil:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Sin ella, los móviles muestran la web como si fuera un monitor grande, con todo diminuto.

## Media queries

Las *media queries* permiten aplicar estilos según el tamaño de la pantalla:

```css
/* Estilos base (móvil primero) */
body {
  font-size: 16px;
}

/* Tablets en adelante */
@media (min-width: 768px) {
  body { font-size: 17px; }
}

/* Escritorio */
@media (min-width: 1024px) {
  body { font-size: 18px; }
}
```

!!! tip "Mobile first"
    Diseña primero para móvil y luego añade mejoras para pantallas grandes. Es más fácil escalar hacia arriba que hacia abajo.

## Unidades relativas

| Unidad | Significado |
|---|---|
| `px` | Píxeles (absoluto) |
| `%` | Porcentaje del contenedor |
| `em` | Relativo al tamaño de fuente del elemento |
| `rem` | Relativo al tamaño de fuente raíz |
| `vw` / `vh` | Porcentaje del viewport (ancho/alto) |

## Flexbox

Para distribuir elementos en una fila o columna:

```css
.contenedor {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
```

## CSS Grid

Para layouts bidimensionales:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## Ejemplo práctico

Ver [ejemplos/05-responsive/ejemplo.html](../ejemplos/05-responsive/ejemplo.html).

## Ejercicios

1. Crea una tarjeta que cambie de una columna (móvil) a dos (desktop).
2. Usa Flexbox para centrar un elemento vertical y horizontalmente.
3. Crea una cuadrícula de 3 columnas que se convierta en 1 en móvil.

---

⬅️ [Capítulo 4 — JavaScript](04-javascript.md) | ➡️ [Capítulo 6 — Formularios](06-formularios.md)
