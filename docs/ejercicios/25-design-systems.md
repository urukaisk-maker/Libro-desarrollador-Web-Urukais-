# 25 — Design systems

!!! quote "Ejercicio resuelto"
    Crea design tokens y un componente Button.

---

## 🎯 Objetivo

1. Define tokens CSS para colores, espaciado y radios.
2. Crea un componente \`.btn\` con variantes.
3. Usa los tokens en el componente.

---

## 💡 Solución

\`\`\`css
:root {
  --color-primary: #6a5acd;
  --color-primary-hover: #7d6ce0;
  --color-danger: #dc3545;
  --space-2: .5rem;
  --space-3: 1rem;
  --radius-md: 8px;
}

.btn {
  padding: var(--space-2) var(--space-3);
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background .2s;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}

.btn--primary:hover {
  background: var(--color-primary-hover);
}

.btn--danger {
  background: var(--color-danger);
  color: white;
}
\`\`\`

\`\`\`html
<button class="btn btn--primary">Guardar</button>
<button class="btn btn--danger">Eliminar</button>
\`\`\`

---

## 🧠 Conceptos clave

- Design tokens: variables CSS semánticas.
- Componente con variantes (BEM: \`.btn--primary\`).
- Consistencia visual en todo el producto.

---

## 🚀 Retos extra

- [ ] Añade variantes de tamaño (\`--sm\`, \`--lg\`).
- [ ] Añade estado \`:disabled\`.
- [ ] Documenta el componente con Storybook.

---

[← Ejercicio 24](24-animaciones.md){ .md-button }
[Volver al índice](index.md){ .md-button .md-button--primary }
