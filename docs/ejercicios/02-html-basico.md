# 02 — HTML básico

!!! quote "Ejercicio resuelto"
    Practica la estructura semántica de una página HTML.

---

## 🎯 Objetivo

Crea una página con:

1. \`<header>\` con un título y un \`<nav>\` con 3 enlaces.
2. \`<main>\` con un \`<article>\` y un \`<aside>\`.
3. \`<footer>\` con un copyright.

---

## 💡 Solución

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi blog</title>
</head>
<body>
  <header>
    <h1>Mi blog personal</h1>
    <nav>
      <a href="#inicio">Inicio</a>
      <a href="#sobre-mi">Sobre mí</a>
      <a href="#contacto">Contacto</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Mi primer post</h2>
      <p>Hoy he aprendido HTML semántico.</p>
    </article>

    <aside>
      <h3>Enlaces</h3>
      <ul>
        <li><a href="#">MDN</a></li>
        <li><a href="#">CSS Tricks</a></li>
      </ul>
    </aside>
  </main>

  <footer>
    <p>© 2026 Mi blog</p>
  </footer>
</body>
</html>
\`\`\`

---

## 🧠 Conceptos clave

- **Etiquetas semánticas**: describen qué es cada parte.
- \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<aside>\`, \`<footer>\`.
- Cada una tiene un propósito y mejora accesibilidad + SEO.

---

## 🚀 Retos extra

- [ ] Añade una imagen con \`<figure>\` y \`<figcaption>\`.
- [ ] Añade una tabla con \`<table>\`.
- [ ] Añade un formulario de contacto.

---

[← Ejercicio 01](01-introduccion.md){ .md-button }
[Ir al ejercicio 03 →](03-css-basico.md){ .md-button .md-button--primary }
