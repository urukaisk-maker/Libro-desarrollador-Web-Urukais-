# 11 — CSS moderno

!!! quote "Ejercicio resuelto"
    Practica variables CSS, \`:has()\` y container queries.

---

## 🎯 Objetivo

Crea una tarjeta que:

1. Use variables CSS para colores.
2. Cambie de estilo si contiene una imagen (\`:has()\`).
3. Se adapte al tamaño del contenedor (container query).

---

## 💡 Solución

\`\`\`html
<div class="card-container">
  <div class="card">
    <img src="https://picsum.photos/200" alt="Ejemplo">
    <h3>Tarjeta con imagen</h3>
  </div>
</div>
\`\`\`

\`\`\`css
:root {
  --primario: #6a5acd;
  --fondo: #f8f7fb;
}

.card-container {
  container-type: inline-size;
  container-name: card;
}

.card {
  background: var(--fondo);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

.card:has(img) {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 1rem;
}

@container card (min-width: 400px) {
  .card {
    padding: 2rem;
  }
}
\`\`\`

---

## 🧠 Conceptos clave

- \`:has(img)\`: aplica estilos si contiene una imagen.
- \`container-type: inline-size\`: activa container queries.
- \`@container card (min-width: 400px)\`: aplica estilos según el contenedor.
- Variables CSS para tematización.

---

## 🚀 Retos extra

- [ ] Cambia las variables en modo oscuro con \`prefers-color-scheme\`.
- [ ] Añade \`:focus-within\` para resaltar la tarjeta al enfocar un input.
- [ ] Usa \`clamp()\` para el tamaño de la fuente.

---

[← Ejercicio 10](10-proyecto-final.md){ .md-button }
[Ir al ejercicio 12 →](12-javascript-asincrono.md){ .md-button .md-button--primary }
