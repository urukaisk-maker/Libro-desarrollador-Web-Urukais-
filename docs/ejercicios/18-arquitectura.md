# 18 — Arquitectura

!!! quote "Ejercicio resuelto"
    Practica la estructura feature-first.

---

## 🎯 Objetivo

Organiza una app con features \`auth\` y \`carrito\` en estructura feature-first.

---

## 💡 Solución

\`\`\`
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   └── LoginForm.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── api.js
│   │   └── index.js
│   └── carrito/
│       ├── components/
│       │   └── CarritoItem.jsx
│       ├── hooks/
│       │   └── useCarrito.js
│       └── api.js
└── shared/
    ├── components/
    │   └── Button.jsx
    └── utils/
        └── format.js
\`\`\`

\`\`\`javascript
// features/auth/index.js
export { LoginForm } from './components/LoginForm';
export { useAuth } from './hooks/useAuth';
\`\`\`

---

## 🧠 Conceptos clave

- Cada feature tiene sus componentes, hooks y api.
- \`shared/\` para lo reutilizable.
- Barrel files (\`index.js\`) para simplificar imports.

---

## 🚀 Retos extra

- [ ] Añade una feature \`productos\`.
- [ ] Crea un barrel file en \`shared/components\`.
- [ ] Añade tests junto a cada componente.

---

[← Ejercicio 17](17-rendimiento.md){ .md-button }
[Ir al ejercicio 19 →](19-fullstack-node.md){ .md-button .md-button--primary }
