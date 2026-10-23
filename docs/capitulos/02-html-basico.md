# 02 — HTML básico

!!! abstract "Qué vas a aprender"
    - La estructura de un documento HTML.
    - Etiquetas, atributos y anidamiento.
    - Las etiquetas esenciales: títulos, párrafos, listas, enlaces, imágenes.
    - Qué es HTML semántico y por qué importa.
    - Cómo validar tu HTML.

---

## 🌐 ¿Qué es HTML?

**HTML** (*HyperText Markup Language*) es el lenguaje de marcado que define la **estructura** de una página web. No es un lenguaje de programación: no tiene variables, bucles ni condiciones. Es un **lenguaje de marcado**, es decir, un sistema de etiquetas que le dicen al navegador qué es cada cosa.

!!! quote "La analogía del esqueleto"
    Si una página web fuera un cuerpo humano, HTML sería el **esqueleto** (estructura), CSS la **piel y la ropa** (apariencia) y JavaScript los **músculos** (movimiento e interacción).

~~~html
<h1>Esto es un título</h1>
<p>Esto es un párrafo con <strong>texto en negrita</strong>.</p>
~~~

---

## 🏛 Estructura de un documento HTML

Todo documento HTML sigue el mismo esqueleto:

~~~html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mi primera página</title>
</head>
<body>
    <h1>¡Hola, mundo!</h1>
    <p>Mi primera página web.</p>
</body>
</html>
~~~

### ¿Qué hace cada línea?

| Línea | Para qué sirve |
| :--- | :--- |
| `<!DOCTYPE html>` | Le dice al navegador que el documento es HTML5. |
| `<html lang="es">` | Raíz del documento. `lang="es"` indica el idioma (importante para lectores de pantalla y SEO). |
| `<head>` | Metadatos: no se ven en la página, pero configuran el documento. |
| `<meta charset="UTF-8">` | Codificación de caracteres. Sin esto, acentos y eñes se ven raros. |
| `<meta name="viewport" ...>` | Hace que la página se adapte a móviles. |
| `<title>` | Texto que aparece en la pestaña del navegador. |
| `<body>` | **Todo lo visible** de la página va aquí dentro. |

~~~mermaid
graph TD
    A[html] --> B[head]
    A --> C[body]
    B --> B1[meta charset]
    B --> B2[title]
    B --> B3[meta viewport]
    C --> C1[h1]
    C --> C2[p]
    C --> C3[img]
~~~

---

## 🏷 Etiquetas, atributos y anidamiento

### Etiquetas

Una **etiqueta** va entre `<` y `>`. Casi siempre vienen **en pareja**:

~~~html
<p>Contenido</p>
~~~

- `<p>` → etiqueta de apertura.
- `</p>` → etiqueta de cierre (con `/`).
- `Contenido` → lo que hay entre ambas.

Algunas son **autocerradas** (no llevan cierre):

~~~html
<img src="foto.jpg" alt="Una foto">
<br>
<hr>
<input type="text">
~~~

### Atributos

Los **atributos** añaden información extra a una etiqueta. Van dentro de la etiqueta de apertura:

~~~html
<a href="https://developer.mozilla.org">MDN Web Docs</a>
~~~

- `href` es el atributo.
- `"https://developer.mozilla.org"` es el valor.

### Anidamiento

Las etiquetas se pueden anidar (una dentro de otra). **Deben cerrarse en orden inverso** al que se abrieron:

~~~html
<p>Esto es <strong>muy importante</strong>.</p>   <!-- ✅ correcto -->
<p>Esto es <strong>muy importante.</p></strong>   <!-- ❌ incorrecto -->
~~~

!!! warning "Errores de anidamiento"
    Un error típico al empezar es cerrar etiquetas en orden equivocado. Si abres `<strong>` dentro de un `<p>`, debes cerrar `</strong>` **antes** de `</p>`.

---

## 📝 Etiquetas esenciales

### Títulos: `<h1>` a `<h6>`

Hay 6 niveles de títulos. `<h1>` es el más importante y `<h6>` el menos. Cada página debería tener **un solo `<h1>`**.

~~~html
<h1>Título principal</h1>
<h2>Sección</h2>
<h3>Subsección</h3>
~~~

!!! tip "Jerarquía, no tamaño"
    No elijas `<h3>` "porque se ve más pequeño". Usa el nivel que corresponda **semánticamente** a la estructura del contenido. El tamaño lo controla CSS.

### Párrafos: `<p>`

~~~html
<p>Este es un párrafo normal.</p>
<p>Este es otro párrafo separado.</p>
~~~

### Listas

**Desordenada** (viñetas):

~~~html
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
~~~

**Ordenada** (números):

~~~html
<ol>
    <li>Instalar el editor</li>
    <li>Crear el archivo</li>
    <li>Escribir el código</li>
</ol>
~~~

### Enlaces: `<a>`

~~~html
<a href="https://developer.mozilla.org">Visitar MDN</a>
<a href="contacto.html">Página de contacto</a>
<a href="#seccion">Ir a una sección</a>
~~~

!!! warning "Enlaces externos"
    En enlaces que se abren en otra pestaña (`target="_blank"`), añade siempre `rel="noopener noreferrer"` por seguridad.

### Imágenes: `<img>`

~~~html
<img src="foto.jpg" alt="Una playa al atardecer" width="400">
~~~

- `src` → ruta de la imagen.
- `alt` → texto alternativo (obligatorio por accesibilidad).

!!! warning "El `alt` no es opcional"
    El atributo `alt` describe la imagen para quien no puede verla (lectores de pantalla, imágenes rotas, SEO). Si la imagen es decorativa, usa `alt=""` (vacío).

### Énfasis: `<strong>` y `<em>`

~~~html
<p>Esto es <strong>importante</strong> y esto es <em>enfático</em>.</p>
~~~

- `<strong>` → importancia (normalmente en **negrita**).
- `<em>` → énfasis (normalmente en *cursiva*).

---

## 🧩 HTML semántico

Las etiquetas **semánticas** describen el significado del contenido, no solo su aspecto. Son clave para accesibilidad y SEO:

~~~html
<header>
    <h1>Mi blog</h1>
    <nav>
        <a href="/">Inicio</a>
        <a href="/sobre">Sobre mí</a>
    </nav>
</header>

<main>
    <article>
        <h2>Mi primer post</h2>
        <p>Contenido del post…</p>
    </article>
</main>

<footer>
    <p>© 2026 Mi blog</p>
</footer>
~~~

| Etiqueta | Significado |
| :--- | :--- |
| `<header>` | Cabecera (logo, título, navegación). |
| `<nav>` | Bloque de navegación (menú). |
| `<main>` | Contenido principal (uno por página). |
| `<article>` | Contenido independiente (post, noticia). |
| `<section>` | Sección temática con su propio título. |
| `<aside>` | Contenido tangencial (barra lateral). |
| `<footer>` | Pie de página. |

!!! tip "Regla práctica"
    Si dudas entre `<div>` y una etiqueta semántica, elige la semántica. `<div>` solo cuando no haya nada mejor.

---

## 🧪 Ejercicio práctico

!!! example "Tu primera página completa"
    Crea un archivo `index.html` con:

    - Un `<h1>` con tu nombre.
    - Un `<p>` con una frase sobre ti.
    - Una lista `<ul>` con tus 3 lenguajes favoritos.
    - Un enlace a MDN.
    - Una imagen (puede ser una URL).

    Cuando termines, ábrelo en el navegador (doble clic) y comprueba que se ve bien.

??? success "Solución"
    ~~~html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Mi primera página</title>
    </head>
    <body>
        <h1>Urukais</h1>
        <p>Soy desarrollador web y me encanta enseñar.</p>
        <h2>Mis lenguajes favoritos</h2>
        <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
        </ul>
        <p>
            <a href="https://developer.mozilla.org/es/">Visitar MDN</a>
        </p>
        <img src="https://picsum.photos/400/200" alt="Imagen aleatoria" width="400">
    </body>
    </html>
    ~~~

---

## 🧠 Quiz

!!! question "Comprueba lo aprendido"

??? success "1. ¿Qué etiqueta indica que el documento es HTML5?"
    `<!DOCTYPE html>` al principio del archivo.

??? success "2. ¿Cuál es la diferencia entre `<strong>` y `<b>`?"
    `<strong>` indica **importancia semántica** (para lectores de pantalla y SEO); `<b>` solo aplica **negrita visual**. Siempre que puedas, usa `<strong>`.

??? success "3. ¿Para qué sirve el atributo `alt` de las imágenes?"
    Describe la imagen para quien no puede verla (accesibilidad), para cuando la imagen no carga, y para SEO.

??? success "4. ¿Cuántos `<h1>` debería tener una página?"
    Idealmente uno. Refleja el título principal del documento.

---

## 📚 Recursos

- [MDN — HTML: Lenguaje de marcado de hipertexto](https://developer.mozilla.org/es/docs/Web/HTML)
- [MDN — Elementos HTML (referencia)](https://developer.mozilla.org/es/docs/Web/HTML/Element)
- [HTML Living Standard (WHATWG)](https://html.spec.whatwg.org/)
- [Validador HTML del W3C](https://validator.w3.org/)

---

➡️ Siguiente capítulo: [03 — CSS básico](03-css-basico.md)