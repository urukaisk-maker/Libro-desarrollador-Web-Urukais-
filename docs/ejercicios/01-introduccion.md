# Ejercicios resueltos — Capítulo 1

[Volver al índice](index.md) · [Capítulo original](../capitulos/01-introduccion.md)

## Ejercicio 1: Tu primera página HTML

> Crea tu primer archivo HTML con un título y un párrafo.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera página</title>
</head>
<body>
  <h1>Hola, mundo</h1>
  <p>Esta es mi primera página web.</p>
</body>
</html>
```

**Explicación:**
- `<!DOCTYPE html>` → indica al navegador que es HTML5.
- `<html lang="es">` → declara el idioma para accesibilidad y SEO.
- `<meta charset="UTF-8">` → codificación de caracteres (acentos, ñ, etc.).
- `<title>` → aparece en la pestaña del navegador.
- `<h1>` → título principal. Solo uno por página.
- `<p>` → párrafo de texto.

---

## Ejercicio 2: Ábrelo en el navegador

> Abre el archivo y comprueba que se ve bien.

### Solución

1. Guarda el archivo como `index.html`.
2. Haz doble clic sobre él.
3. Se abrirá en tu navegador por defecto.
4. Deberías ver el título grande y el párrafo debajo.

**Si no se ve bien:**
- Comprueba que el archivo termina en `.html` y no en `.txt`.
- Abre la consola (`F12`) y mira si hay errores.
- Verifica que las etiquetas están cerradas correctamente.

---

## Ejercicio 3: Cambia el color de fondo

> Modifica el color de fondo con CSS en línea.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera página</title>
</head>
<body style="background-color: #f8fafc; font-family: system-ui, sans-serif;">
  <h1 style="color: #6a5acd;">Hola, mundo</h1>
  <p style="color: #1e293b;">Esta es mi primera página web.</p>
</body>
</html>
```

**Explicación:**

- `style="background-color: ..."` → aplica CSS directo al elemento.
- `#f8fafc` → color en hexadecimal (gris muy claro).
- `font-family: system-ui` → usa la fuente del sistema.
- `color: #6a5acd` → cambia el color del texto a morado.

!!! tip "Mejor con CSS externo"
    El CSS en línea funciona, pero se considera mala práctica. En el [Capítulo 3](../capitulos/03-css-basico.md) verás cómo hacerlo bien con un archivo externo.

---

## Ejercicio 4: Añade un enlace

> Añade un enlace a tu web favorita.

### Solución

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera página</title>
</head>
<body>
  <h1>Hola, mundo</h1>
  <p>Esta es mi primera página web.</p>
  <p>
    Visita
    <a href="https://developer.mozilla.org/es/" target="_blank" rel="noopener">
      MDN Web Docs
    </a>
    para aprender más.
  </p>
</body>
</html>
```

**Explicación:**

- `<a href="...">` → crea un enlace.
- `target="_blank"` → abre el enlace en una pestaña nueva.
- `rel="noopener"` → **importante por seguridad**. Evita que la web de destino pueda manipular la tuya.

!!! warning "Nunca olvides `rel=\"noopener\"`"
    Cuando uses `target="_blank"`, añade siempre `rel="noopener"` o `rel="noopener noreferrer"`. Es una medida de seguridad básica.

---

[Volver al índice](index.md) · [Capítulo original](../capitulos/01-introduccion.md)
