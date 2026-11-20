---
description: "Chapter 18 of the Web Developer's Book: 18 — Frontend Architecture. Learn step by step with examples, exercises, and quizzes."
---
# 18 — Frontend Architecture

!!! abstract "What you will learn"
    - What frontend architecture is and why it matters.
    - Folder structures: feature-first vs. layer-first.
    - Component patterns.
    - State management.
    - Best practices for scalable projects.

---

## 🏗 What is Frontend Architecture?

**Frontend architecture** is how you organize an application's code so it stays **maintainable, scalable, and easy to understand**. It isn't about adding more libraries—it's about making decisions that let the project grow without collapsing.

!!! quote "Code is read many more times than it is written"
    Good architecture makes code easy to read, change, and test. Bad architecture makes every change a nightmare.

---

## 📁 Folder Structure

### Layer-first (By Layer)

```
src/
├── components/
├── hooks/
├── services/
├── utils/
├── pages/
└── styles/
```

**Pros**: easy to find things by type. **Cons**: each feature is spread across 5 folders.

### Feature-first (By Feature)

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api.js
│   │   └── auth.test.js
│   ├── carrito/
│   └── productos/
├── shared/
│   ├── components/
│   └── utils/
└── app/
    ├── routes.js
    └── layout.js
```

**Pros**: each feature lives together. **Cons**: more folders at the start.

!!! tip "Feature-first for large projects"
    If the project will grow, use feature-first. If it's small, layer-first is enough. You can start with layer-first and migrate as the project grows.

---

## 🧩 Component Patterns

### Presentational Components

Only receive props and render UI. They have no business logic.

```jsx
function Boton({ texto, onClick }) {
  return <button onClick={onClick}>{texto}</button>;
}
```

### Container Components

Manage state and logic, and pass props to presentational components.

```jsx
function ListaTareas() {
  const [tareas, setTareas] = useState([]);

  const añadir = (texto) => {
    setTareas([...tareas, { id: Date.now(), texto }]);
  };

  return <ListaTareasUI onAñadir="{añadir}" tareas="{tareas}"/>;
}
```

!!! quote "Separate logic and presentation"
    Separating presentation and logic makes components easier to test, reuse, and understand.

---

## 🗃 State Management

### Local State

For things that only affect one component (an input, a toggle).

```jsx
const [abierto, setAbierto] = useState(false);
```

### Shared State

For things that affect several nearby components: lift state up to their common parent.

### Global State

For things that affect the whole app: theme, authenticated user, cart.

| Tool | When to use it |
| :--- | :--- |
| **Context API** | Simple state, low update frequency |
| **Zustand** | Simple global state without boilerplate |
| **Redux Toolkit** | Complex state with many actions |
| **TanStack Query** | Server state (fetch, cache, refetch) |

---

## ✅ Architecture Best Practices

- ✅ **Small components**: if a component exceeds 200 lines, split it up.
- ✅ **One responsibility per file**: one component, one hook, one function.
- ✅ **Descriptive names**: `BotonPrimario` is better than `Btn1`.
- ✅ **Avoid logic inside JSX**: extract helper functions.
- ✅ **Use TypeScript**: types document the architecture.
- ✅ **Tests near the code**: `Boton.test.jsx` right next to `Boton.jsx`.
- ✅ **Use barrel files sparingly**: `index.js` re-exports can slow down builds.
- ❌ **Don't overuse global state**: if only one component uses it, keep it local.
- ❌ **Don't mix business logic with UI**: use hooks or services.

---

## 🧱 Complete Architecture Example

```
src/
├── app/
│   ├── App.jsx
│   ├── routes.jsx
│   └── providers.jsx
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.jsx
│   │   │   └── LoginForm.test.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── api.js
│   │   └── index.js
│   └── carrito/
│       ├── components/
│       ├── hooks/
│       └── api.js
├── shared/
│   ├── components/
│   │   ├── Button.jsx
│   │   └── Modal.jsx
│   ├── hooks/
│   └── utils/
└── styles/
    └── global.css
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-18">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which folder structure groups code by feature?</p>
<button class="quiz-option" data-opt="a">A) Layer-first</button>
<button class="quiz-option" data-opt="b">B) Feature-first</button>
<button class="quiz-option" data-opt="c">C) Flat</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> Which component only receives props and renders UI?</p>
<button class="quiz-option" data-opt="a">A) Presentational component</button>
<button class="quiz-option" data-opt="b">B) Container component</button>
<button class="quiz-option" data-opt="c">C) Higher-order component</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which tool is ideal for server state?</p>
<button class="quiz-option" data-opt="a">A) Redux</button>
<button class="quiz-option" data-opt="b">B) Context API</button>
<button class="quiz-option" data-opt="c">C) TanStack Query</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2018%3A%20Frontend%20Architecture&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F18-arquitectura%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F18-arquitectura%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2018%3A%20Frontend%20Architecture%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F18-arquitectura%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/18-arquitectura/" aria-label="Copy link">Copy link</button>
</div>

---

## 🏆 You Finished the Advanced Level!

If you made it this far, you already know:

- Modern CSS: variables, container queries, :has()
- Asynchronous JavaScript: promises, async/await, event loop
- Modules and bundlers: Vite, Webpack, esbuild
- Web accessibility: WCAG, ARIA, keyboard
- TypeScript: types, interfaces, generics
- Testing: Vitest, Testing Library, Playwright
- Web performance: Core Web Vitals, lazy loading, optimization
- Frontend architecture: structure, patterns, state

!!! quote "Congratulations"
    You went from knowing HTML, CSS, and JS to mastering the modern frontend ecosystem. Now comes the **Professional Level**: Full-stack with Node.js and DevOps.

---

## ➡ Next Step

[Go to Chapter 19 — Full-stack con Node.js](19-fullstack-node.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }