# 10 — Portfolio

!!! quote "Ejercicio resuelto"
    Crea un portfolio sencillo con HTML semántico y CSS.

---

## 🎯 Objetivo

Crea un portfolio con:

1. Sección "Sobre mí".
2. Sección "Proyectos" con 3 tarjetas.
3. Sección "Contacto" con email.
4. Diseño responsive.

---

## 💡 Solución

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio de Ana</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Ana García</h1>
    <p>Desarrolladora frontend</p>
  </header>

  <main>
    <section id="sobre-mi">
      <h2>Sobre mí</h2>
      <p>Me encanta construir interfaces accesibles y rápidas.</p>
    </section>

    <section id="proyectos">
      <h2>Proyectos</h2>
      <div class="proyectos">
        <article>
          <h3>Lista de tareas</h3>
          <p>App para gestionar tareas con localStorage.</p>
        </article>
        <article>
          <h3>Buscador de películas</h3>
          <p>Consume la API de OMDB.</p>
        </article>
        <article>
          <h3>Clon de Twitter</h3>
          <p>Interfaz hecha con React.</p>
        </article>
      </div>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
      <p>Escríbeme a <a href="mailto:ana@ejemplo.com">ana@ejemplo.com</a>.</p>
    </section>
  </main>

  <footer>
    <p>© 2026 Ana García</p>
  </footer>
</body>
</html>
\`\`\`

\`\`\`css
body {
  font-family: system-ui, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

.proyectos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

article {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
\`\`\`

---

## 🧠 Conceptos clave

- HTML semántico (\`header\`, \`main\`, \`section\`, \`article\`, \`footer\`).
- CSS Grid con \`auto-fit\` para responsive.
- Enlaces \`mailto\`.

---

## 🚀 Retos extra

- [ ] Añade modo oscuro.
- [ ] Añade una foto de perfil.
- [ ] Añade animaciones sutiles al hover.

---

[← Ejercicio 09](09-despliegue.md){ .md-button }
[Volver al índice](index.md){ .md-button .md-button--primary }
