---
description: "Solved exercise 12: 12 — Asynchronous JavaScript. Step-by-step annotated solution from the Web Developer's Book."
---
# 12 — Asynchronous JavaScript

!!! quote "Solved exercise"
    Practice promises, async/await, and error handling.

---

## 🎯 Goal

Create a function that:

1. Makes 2 requests in parallel.
2. Combines the results.
3. Handles network errors.

---

## 💡 Solution

```javascript
async function cargarDatos() {
  try {
    const [usuarios, posts] = await Promise.all([
      fetch('[https://jsonplaceholder.typicode.com/users').then(r](https://jsonplaceholder.typicode.com/users').then(r) => r.json()),
      fetch('[https://jsonplaceholder.typicode.com/posts').then(r](https://jsonplaceholder.typicode.com/posts').then(r) => r.json())
    ]);

    return {
      usuarios: usuarios.length,
      posts: posts.length,
      ultimoPost: posts[posts.length - 1].title
    };
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  }
}

cargarDatos().then(data => console.log(data));
```

---

## 🧠 Key Concepts

- `Promise.all()`: waits for all promises to resolve.
- `async/await`: cleaner, more readable syntax.
- `try/catch`: error handling.
- Array destructuring.

---

## 🚀 Extra Challenges

- [ ] Use `Promise.allSettled` so a single failure does not cancel everything.
- [ ] Add a timeout with `Promise.race`.
- [ ] Show a loading state while data is being fetched.

---

[← Exercise 11](11-css-moderno.md){ .md-button }
[Go to exercise 13 →](13-modulos-bundlers.md){ .md-button .md-button--primary }