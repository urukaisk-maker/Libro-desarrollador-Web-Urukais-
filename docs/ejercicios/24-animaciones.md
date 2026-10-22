# 24 — Animaciones

!!! quote "Ejercicio resuelto"
    Anima un elemento con transform y opacity.

---

## 🎯 Objetivo

Crea una animación que:

1. Mueva un cuadrado de izquierda a derecha.
2. Cambie su opacidad.
3. Use \`transform\` y \`opacity\` (no \`left\`).
4. Respete \`prefers-reduced-motion\`.

---

## 💡 Solución

\`\`\`html
<div class="cuadrado"></div>
\`\`\`

\`\`\`css
.cuadrado {
  width: 100px;
  height: 100px;
  background: #6a5acd;
  animation: mover 2s ease-in-out infinite alternate;
}

@keyframes mover {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(200px);
    opacity: 0.5;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cuadrado { animation: none; }
}
\`\`\`

---

## 🧠 Conceptos clave

- \`transform\` y \`opacity\` son GPU-friendly.
- \`@keyframes\`: define la animación.
- \`prefers-reduced-motion\`: respeta la accesibilidad.

---

## 🚀 Retos extra

- [ ] Usa la Web Animations API en lugar de CSS.
- [ ] Añade stagger a una lista de elementos.
- [ ] Anima al hacer scroll con Intersection Observer.

---

[← Ejercicio 23](23-websockets.md){ .md-button }
[Ir al ejercicio 25 →](25-design-systems.md){ .md-button .md-button--primary }
