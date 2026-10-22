# 05 — Responsive

!!! quote "Ejercicio resuelto"
    Practica el diseño responsive con media queries.

---

## 🎯 Objetivo

Crea una galería que:

1. Muestre 1 columna en móvil.
2. Muestre 2 columnas en tablet.
3. Muestre 3 columnas en escritorio.

---

## 💡 Solución

\`\`\`html
<div class="galeria">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
\`\`\`

\`\`\`css
.galeria {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

@media (min-width: 640px) {
  .galeria {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .galeria {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item {
  background: #6a5acd;
  color: white;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
}
\`\`\`

---

## 🧠 Conceptos clave

- **Mobile first**: empieza con 1 columna y amplía con \`min-width\`.
- \`grid-template-columns\`: define las columnas.
- \`repeat(n, 1fr)\`: repite n columnas de igual tamaño.
- \`@media (min-width: ...)\`: aplica estilos a partir de ese ancho.

---

## 🚀 Retos extra

- [ ] Usa \`auto-fit\` con \`minmax\` para que se adapte automáticamente.
- [ ] Añade hover a cada item.
- [ ] Añade imágenes en lugar de números.

---

[← Ejercicio 04](04-javascript.md){ .md-button }
[Volver al índice](index.md){ .md-button .md-button--primary }
