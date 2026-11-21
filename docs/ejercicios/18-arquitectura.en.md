---
description: "Solved exercise 18: 18 — Architecture. Step-by-step annotated solution from the Web Developer Book."
---
# 18 — Architecture

!!! quote "Solved exercise"
    Practice the feature-first structure.

---

## 🎯 Goal

Organize an app with `auth` and `carrito` features in a feature-first structure.

---

## 💡 Solution

```
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
```

```javascript
// features/auth/index.js
export { LoginForm } from './components/LoginForm';
export { useAuth } from './hooks/useAuth';
```

---

## 🧠 Key concepts

- Each feature owns its components, hooks, and api.
- `shared/` for reusable code.
- Barrel files (`index.js`) to simplify imports.

---

## 🚀 Bonus challenges

- [ ] Add a `productos` feature.
- [ ] Create a barrel file in `shared/components`.
- [ ] Add tests alongside each component.

---

[← Exercise 17](17-rendimiento.md){ .md-button }
[Go to exercise 19 →](19-fullstack-node.md){ .md-button .md-button--primary }
