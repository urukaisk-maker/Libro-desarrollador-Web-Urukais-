# 14 — Accesibilidad

!!! quote "Ejercicio resuelto"
    Practica HTML semántico, ARIA y navegación por teclado.

---

## 🎯 Objetivo

Crea un botón de "Cerrar" que:

1. Sea accesible (teclado + lector de pantalla).
2. Tenga \`aria-label\` descriptivo.
3. Muestre feedback visual al enfocarse.

---

## 💡 Solución

\`\`\`html
<button class="cerrar" aria-label="Cerrar modal">✕</button>
\`\`\`

\`\`\`css
.cerrar {
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: .5rem .75rem;
  font-size: 1.2rem;
  cursor: pointer;
}

.cerrar:focus-visible {
  outline: 2px solid #6a5acd;
  outline-offset: 2px;
}
\`\`\`

---

## 🧠 Conceptos clave

- \`<button>\` nativo es accesible por defecto (teclado + lector de pantalla).
- \`aria-label\`: describe el botón a lectores de pantalla.
- \`:focus-visible\`: estilo de foco solo cuando se navega con teclado.
- **Nunca** uses \`<div onclick>\` para botones.

---

## 🚀 Retos extra

- [ ] Añade un modal con \`<dialog>\` nativo.
- [ ] Añade \`aria-hidden\` a los elementos decorativos.
- [ ] Prueba con un lector de pantalla (Orca, NVDA o VoiceOver).

---

[← Ejercicio 13](13-modulos-bundlers.md){ .md-button }
[Ir al ejercicio 15 →](15-typescript.md){ .md-button .md-button--primary }
