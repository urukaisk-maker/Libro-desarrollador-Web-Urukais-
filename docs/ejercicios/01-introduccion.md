# 01 — Introducción

!!! quote "Ejercicio resuelto"
    Primer contacto con HTML, CSS y JavaScript. Vas a crear tu primera página interactiva.

---

## 🎯 Objetivo

Crea una página HTML que muestre:

1. Un título con tu nombre.
2. Un párrafo con una breve presentación.
3. Un botón que, al pulsarlo, muestre un \`alert\` con un saludo.

---

## 💡 Solución

\`\`\`html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Mi primera página</title>
</head>
<body>
  <h1>Hola, soy Ana</h1>
  <p>Estoy aprendiendo desarrollo web con el Libro del Desarrollador Web.</p>
  <button id="saludo">Saludar</button>

  <script>
    document.getElementById('saludo').addEventListener('click', () => {
      alert('¡Hola desde mi primera página! 👋');
    });
  </script>
</body>
</html>
\`\`\`

---

## 🧠 Conceptos clave

- \`<!DOCTYPE html>\`: indica al navegador que es HTML5.
- \`<h1>\`: título principal (solo uno por página).
- \`<button id="saludo">\`: el \`id\` permite seleccionarlo desde JS.
- \`document.getElementById()\`: selecciona un elemento por su id.
- \`addEventListener('click', ...)\`: escucha el evento de clic.

---

## 🚀 Retos extra

- [ ] Añade un segundo botón que cambie el color del título.
- [ ] Pide el nombre al usuario con \`prompt()\` y salúdalo.
- [ ] Añade una imagen con \`<img>\`.

---

[← Volver al índice](index.md){ .md-button }
[Ir al ejercicio 02 →](02-html-basico.md){ .md-button .md-button--primary }
