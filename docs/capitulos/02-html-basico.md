# 02 — HTML básico

!!! abstract "Qué vas a aprender"
    - La estructura de un documento HTML.
    - Las etiquetas semánticas más importantes.
    - Cómo enlazar páginas, imágenes y formularios.
    - Las bases de la accesibilidad.

---

## 🌐 ¿Qué es HTML?

**HTML** (*HyperText Markup Language*) es el lenguaje de marcado que define la **estructura** de una página web. No es un lenguaje de programación: no tiene variables, ni bucles, ni funciones. Es un lenguaje de **etiquetas** que le dice al navegador qué es cada cosa.

\`\`\`html
<h1>Esto es un título</h1>
<p>Esto es un párrafo con <strong>texto en negrita</strong>.</p>
\`\`\`

!!! tip "HTML no es programación"
    HTML describe la estructura. CSS describe la presentación. JavaScript describe el comportamiento.

---

## 🏗️ Estructura de un documento HTML

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi primera página</title>
</head>
<body>
  <h1>Hola, mundo</h1>
</body>
</html>
\`\`\`

| Etiqueta | Para qué sirve |
| :--- | :--- |
| <!DOCTYPE html> | Indica al navegador que es HTML5 |
| <html> | Elemento raíz del documento |
| <head> | Metadatos |
| <body> | Contenido visible |
| <meta charset="UTF-8"> | Codificación de caracteres |
| <meta name="viewport"> | Para que se vea bien en móvil |
| <title> | Título de la pestaña |

---

## 📝 Etiquetas semánticas

\`\`\`html
<header>
  <h1>Mi sitio web</h1>
  <nav>
    <a href="#inicio">Inicio</a>
    <a href="#sobre-mi">Sobre mí</a>
  </nav>
</header>

<main>
  <article>
    <h2>Mi primer artículo</h2>
    <p>Contenido del artículo…</p>
  </article>
</main>

<footer>
  <p>© 2026 Mi sitio web</p>
</footer>
\`\`\`

| Etiqueta | Uso |
| :--- | :--- |
| <header> | Cabecera |
| <nav> | Menú de navegación |
| <main> | Contenido principal |
| <article> | Contenido independiente |
| <section> | Sección temática |
| <aside> | Contenido lateral |
| <footer> | Pie de página |

!!! warning "Por qué importa la semántica"
    Usar <div> para todo es tentador, pero las etiquetas semánticas mejoran la accesibilidad, el SEO y la legibilidad del código.

---

## 🔗 Enlaces e imágenes

\`\`\`html
<a href="https://example.com" target="_blank" rel="noopener">Ir a ejemplo</a>
<a href="#seccion">Ir a la sección</a>
<img src="foto.jpg" alt="Descripción de la imagen" width="400" height="300" loading="lazy">
\`\`\`

!!! tip "El atributo alt es obligatorio"
    El texto alternativo describe la imagen a quienes no pueden verla.

---

## 📝 Formularios

\`\`\`html
<form action="/enviar" method="POST">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <button type="submit">Enviar</button>
</form>
\`\`\`

!!! warning "Siempre asocia label con input"
    El atributo for del label debe coincidir con el id del input.

---

## 🧠 Pon a prueba tus conocimientos

<div class="quiz" data-quiz="capitulo-2">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> ¿Qué etiqueta define el contenido principal de una página?</p>
<button class="quiz-option" data-opt="a">A) &lt;div&gt;</button>
<button class="quiz-option" data-opt="b">B) &lt;main&gt;</button>
<button class="quiz-option" data-opt="c">C) &lt;body&gt;</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> ¿Para qué sirve el atributo alt de una imagen?</p>
<button class="quiz-option" data-opt="a">A) Para darle un título</button>
<button class="quiz-option" data-opt="b">B) Para cambiar su tamaño</button>
<button class="quiz-option" data-opt="c">C) Para describirla a quien no puede verla</button>
</div>
</div>

---

## 📢 Comparte este capítulo

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Cap%C3%ADtulo%202%3A%20HTML%20b%C3%A1sico&url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F02-html-basico%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F02-html-basico%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Cap%C3%ADtulo%202%3A%20HTML%20b%C3%A1sico%20https%3A%2F%2Flibro.urukais.com%2Fcapitulos%2F02-html-basico%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/capitulos/02-html-basico/" aria-label="Copiar enlace">Copiar enlace</button>
</div>

---

## ➡️ Siguiente paso

[Ir al Capítulo 3 — CSS básico](03-css-basico.md){ .md-button .md-button--primary }
[Volver al índice](../index.md){ .md-button }
