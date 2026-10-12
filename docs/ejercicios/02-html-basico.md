# Ejercicios resueltos — Capítulo 2

[Volver al índice](index.md) · [Capítulo original](../capitulos/02-html-basico.md)

## Ejercicio 1: Estructura con h1, párrafos y lista

> Crea un archivo `index.html` con un `<h1>`, dos `<p>` y una lista.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi biografía</title>
</head>
<body>
  <h1>Mi biografía</h1>

  <p>Hola, me llamo Urukais y soy desarrollador web.</p>
  <p>Llevo años construyendo proyectos en internet y me encanta enseñar lo que aprendo.</p>

  <h2>Mis aficiones</h2>
  <ul>
    <li>Programar</li>
    <li>Leer</li>
    <li>Escuchar música</li>
  </ul>
</body>
</html>
```

**Explicación:**
- Un solo `<h1>` (el título principal).
- `<h2>` para subsecciones.
- `<ul>` → lista desordenada (con viñetas).
- Cada ítem va dentro de un `<li>`.

---

## Ejercicio 2: Enlace a tu web favorita

> Añade un enlace a tu web favorita.

### Solución

```html
<p>
  Mi web favorita es
  <a href="https://developer.mozilla.org/es/" target="_blank" rel="noopener">
    MDN Web Docs
  </a>.
</p>
```

---

## Ejercicio 3: Imagen con alt descriptivo

> Inserta una imagen con `alt` descriptivo.

### Solución

```html
<figure>
  <img
    src="https://picsum.photos/400/300"
    alt="Fotografía aleatoria de un paisaje"
    width="400"
    height="300"
    loading="lazy"
  >
  <figcaption>Una imagen cualquiera</figcaption>
</figure>
```

**Explicación:**

- `alt` → describe la imagen. Esencial para accesibilidad.
- `width` y `height` → evitan que el layout salte al cargar.
- `loading="lazy"` → carga la imagen solo cuando va a aparecer.
- `<figure>` + `<figcaption>` → imagen con pie de foto semántico.

!!! tip "Cómo escribir buen `alt`"
    Pregúntate: *si no pudiera ver la imagen, ¿qué información perdería?* Eso es lo que va en el `alt`. Si la imagen es puramente decorativa, usa `alt=""` (vacío).

---

## Ejercicio 4: Tabla de datos

> Crea una tabla con 3 columnas y 3 filas de datos.

### Solución

```html
<table>
  <thead>
    <tr>
      <th>Tecnología</th>
      <th>Uso</th>
      <th>Año de creación</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>Estructura</td>
      <td>1993</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>Estilos</td>
      <td>1996</td>
    </tr>
    <tr>
      <td>JavaScript</td>
      <td>Interactividad</td>
      <td>1995</td>
    </tr>
  </tbody>
</table>
```

**Explicación:**

- `<thead>` → cabecera de la tabla.
- `<tbody>` → cuerpo de la tabla.
- `<th>` → celda de cabecera (en negrita por defecto).
- `<td>` → celda de datos.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/02-html-basico.md)
