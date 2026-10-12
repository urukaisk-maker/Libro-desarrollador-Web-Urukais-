# Ejercicios resueltos — Capítulo 3

[Volver al índice](index.md) · [Capítulo original](../capitulos/03-css-basico.md)

## Ejercicio 1: Color de fondo del body

> Cambia el color de fondo del `body` a un tono claro.

### Solución

```css
body {
  background-color: #f8fafc;
  margin: 0;
  padding: 2rem;
}
```

**Explicación:**

- `#f8fafc` → gris muy claro, ideal para fondos.
- `margin: 0` → quita el margen por defecto del navegador.
- `padding: 2rem` → añade espacio interior.

---

## Ejercicio 2: Tipografía distinta para h1

> Aplica una tipografía distinta a los `h1`.

### Solución

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');

h1 {
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  letter-spacing: -0.02em;
}
```

**Explicación:**

- `@import` → carga la fuente desde Google Fonts.
- `font-family` → lista de fuentes en orden de preferencia.
- `system-ui, sans-serif` → fallback si Inter no carga.
- `letter-spacing: -0.02em` → acerca un poco las letras (truco tipográfico).

!!! tip "Alternativa sin dependencias externas"
    Puedes usar solo fuentes del sistema:
    ```css
    h1 {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    }
    ```
    Es más rápido y no depende de Google.

---

## Ejercicio 3: Clase `.destacado`

> Crea una clase `.destacado` y úsala en un párrafo.

### Solución

```html
<p class="destacado">
  Este párrafo lleva un estilo distinto para resaltar.
</p>
```

```css
.destacado {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 1rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
}
```

**Explicación:**

- `.destacado` → clase que se aplica con `class="destacado"`.
- `border-left` → barra lateral de color.
- `padding` con dos valores → `1rem` arriba/abajo, `1.25rem` izquierda/derecha.

---

## Ejercicio 4: Padding y border a un div

> Añade `padding` y `border` a un `<div>`.

### Solución

```html
<div class="caja">
  Contenido dentro de la caja.
</div>
```

```css
.caja {
  padding: 1.5rem;
  border: 2px solid #6a5acd;
  border-radius: 12px;
  background: #fff;
  max-width: 500px;
  margin: 2rem auto;
  box-shadow: 0 4px 12px rgba(106, 90, 205, 0.15);
}
```

**Explicación:**

- `padding` → espacio interior.
- `border: 2px solid color` → borde sólido.
- `border-radius` → esquinas redondeadas.
- `margin: 2rem auto` → **auto** centra horizontalmente el div.
- `box-shadow` → sombra suave.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/03-css-basico.md)
