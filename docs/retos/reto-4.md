---
description: "Reto 4: Galería responsive. Practica tus habilidades de desarrollo web con este desafío del Libro del Desarrollador Web."
---
# 🎯 Reto #4: Galería responsive

!!! quote "Reto de nivel intermedio"
    Crea una galería de imágenes responsive con CSS Grid, lightbox y lazy loading. Ideal para practicar Grid y eventos.

---

## 🎯 Objetivo

Crea una galería que:

1. Use **CSS Grid** para el layout.
2. Se adapte a **cualquier pantalla**.
3. Muestre las imágenes en un **lightbox** al hacer clic.
4. Use **lazy loading** nativo.

## 🧠 Conceptos

- CSS Grid
- Media queries
- Eventos
- \`loading="lazy"\`

## 🖥️ Editor

<div class="playground-ejercicio" data-ejercicio="reto-4">
<div class="playground__editor">
<div class="playground__tabs">
<button class="playground__tab is-active" data-lang="html">HTML</button>
<button class="playground__tab" data-lang="css">CSS</button>
<button class="playground__tab" data-lang="js">JS</button>
</div>
<textarea class="playground__textarea" data-lang="html" spellcheck="false"><div class="galeria">
  <img src="https://picsum.photos/id/10/400/300" alt="Imagen 1" loading="lazy">
  <img src="https://picsum.photos/id/20/400/300" alt="Imagen 2" loading="lazy">
  <img src="https://picsum.photos/id/30/400/300" alt="Imagen 3" loading="lazy">
  <img src="https://picsum.photos/id/40/400/300" alt="Imagen 4" loading="lazy">
  <img src="https://picsum.photos/id/50/400/300" alt="Imagen 5" loading="lazy">
  <img src="https://picsum.photos/id/60/400/300" alt="Imagen 6" loading="lazy">
</div></textarea>
<textarea class="playground__textarea is-hidden" data-lang="css" spellcheck="false">body { font-family: system-ui; padding: 1rem; margin: 0; }
.galeria {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.galeria img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 4/3;
  border-radius: 8px;
  cursor: pointer;
  transition: transform .2s;
}
.galeria img:hover { transform: scale(1.03); }</textarea>
<textarea class="playground__textarea is-hidden" data-lang="js" spellcheck="false">// Tu código aquí
</textarea>
<div class="playground__actions">
<button class="md-button md-button--primary" data-run>▶ Ejecutar</button>
</div>
</div>
<div class="playground__output">
<iframe data-output sandbox="allow-scripts allow-modals"></iframe>
</div>
</div>

??? success "Solución"
    \`\`\`javascript
    document.querySelectorAll('.galeria img').forEach(img => {
      img.addEventListener('click', () => {
        const w = window.open('');
        w.document.write('<img src="' + img.src + '" style="max-width:100%">');
      });
    });
    \`\`\`

## 💡 Pistas progresivas

??? tip "Pista 1 — Estructura base y flujo principal (Reto #4: Galería responsive)"
    Empieza construyendo la estructura mínima funcional y comprueba que el flujo principal responde como esperas antes de añadir detalles visuales o casos extra.

??? tip "Pista 2 — Estados, entradas y casos límite"
    Revisa qué sucede con datos vacíos o inesperados, cambios de estado en la interfaz o eventos repetidos, y asegúrate de limpiar o actualizar el estado correctamente.

??? tip "Pista 3 — Limpieza, accesibilidad y validación final"
    Comprueba que no haya errores ni avisos en consola, que los elementos interactivos sean accesibles y que el código esté claro y modular.

## ✅ Checklist de comprobación

- [ ] Se cumple el objetivo principal de Reto #4: Galería responsive sin errores en consola.
- [ ] Funcionan los eventos, estados y casos límite descritos en el enunciado.
- [ ] La solución es clara, mantenible y está verificada en el editor/navegador.

## 🚀 Retos extra

- [ ] **Filtros** por categoría.
- [ ] **Skeleton loader** mientras cargan.
- [ ] **Modo masonry** con CSS columns.

---

[← Volver a retos](../retos.md){ .md-button }
[🎯 Ir al Reto #5](reto-5.md){ .md-button .md-button--primary }
