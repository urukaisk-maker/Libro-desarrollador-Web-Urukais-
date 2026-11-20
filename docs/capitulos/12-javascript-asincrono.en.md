---
description: "Chapter 12 of the Web Developer's Book: 12 — Asynchronous JavaScript. Learn step by step with examples, exercises, and quizzes."
---
# 12 — Asynchronous JavaScript

!!! abstract "What you will learn"
    - Why asynchrony exists in JavaScript.
    - Callbacks, promises, and async/await.
    - The event loop in depth.
    - Asynchronous error handling.
    - Patterns: Promise.all, Promise.race, Promise.allSettled.

---

## ⏳ Why Asynchrony?

JavaScript is **single-threaded**: it can only execute one thing at a time. If an operation takes time (an HTTP request, reading a file, a timer), it would block everything. Asynchrony lets you **avoid blocking** while waiting.

```javascript
// Synchronous: blocks
console.log('1');
console.log('2');
console.log('3');
// Output: 1, 2, 3

// Asynchronous: non-blocking
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2
```

!!! quote "JavaScript waits for no one"
    When an asynchronous operation starts, JavaScript keeps running the rest of the code. The operation finishes later and its result is handled with callbacks, promises, or async/await.

---

## 🕰 Callbacks (The Old Way)

```javascript
function cargarDatos(callback) {
  setTimeout(() => {
    callback({ nombre: 'Ana' });
  }, 1000);
}

cargarDatos(function (datos) {
  console.log(datos); // { nombre: 'Ana' }
});
```

### The Problem: Callback Hell

```javascript
cargarUsuario(id, function (usuario) {
  cargarPosts(usuario.id, function (posts) {
    cargarComentarios(posts[0].id, function (comentarios) {
      console.log(comentarios);
    });
  });
});
```

This is hard to read and hard to handle errors in. That is why promises were created.

---

## 🤝 Promises

A **promise** represents a value that will be available in the future. It has three states:

- **Pending**: still in progress.
- **Fulfilled**: resolved with a value.
- **Rejected**: rejected with an error.

```javascript
const promesa = new Promise((resolve, reject) => {
  const exito = true;
  if (exito) resolve('¡Funcionó!');
  else reject(new Error('Algo salió mal'));
});

promesa
  .then(valor => console.log(valor))
  .catch(err => console.error(err));
```

### Chaining Promises

```javascript
fetch('/api/usuario')
  .then(res => res.json())
  .then(usuario => fetch('/api/posts/' + usuario.id))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));
```

Much easier to read than nested callbacks.

---

## ⚡ async/await

The modern way, **syntactic sugar over promises**:

```javascript
async function cargarDatos() {
  try {
    const res = await fetch('/api/usuario');
    const usuario = await res.json();
    const res2 = await fetch('/api/posts/' + usuario.id);
    const posts = await res2.json();
    console.log(posts);
  } catch (err) {
    console.error(err);
  }
}
```

- `async` marks the function as asynchronous (it always returns a promise).
- `await` pauses execution until the promise resolves.

!!! tip "async/await does not block"
    Even though `await` looks like it blocks, it doesn't: it only pauses **that function**. The rest of the program keeps running.

---

## 🧠 The Event Loop in Depth

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2
```

### Why This Order?

1. **1** and **4** are synchronous → they run first.
2. **3** is a microtask (promise) → it runs before macrotasks.
3. **2** is a macrotask (`setTimeout`) → it runs at the end.

| Type | Examples | Priority |
| :--- | :--- | :--- |
| **Call stack** | Synchronous code | 1 |
| **Microtasks** | Promises, `queueMicrotask` | 2 |
| **Macrotasks** | `setTimeout`, `setInterval`, events | 3 |

!!! quote "The event loop in one sentence"
    The event loop drains the call stack, then all microtasks, then one macrotask. And repeats.

---

## 🎯 Promise Patterns

### Promise.all

Waits for **all** promises to resolve. If one fails, everything fails.

```javascript
const [usuarios, posts] = await Promise.all([
  fetch('/api/usuarios').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
```

### Promise.allSettled

Waits for all promises, **even if some fail**. Returns an array with `status` and `value`/`reason`.

```javascript
const resultados = await Promise.allSettled([p1, p2, p3]);
resultados.forEach(r => {
  if (r.status === 'fulfilled') console.log('OK:', r.value);
  else console.error('Error:', r.reason);
});
```

### Promise.race

Returns the **first** promise to settle (resolve or reject).

```javascript
const resultado = await Promise.race([
  fetch('/api/a'),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)),
]);
```

### Promise.any

Returns the **first promise that fulfills**. If all reject, it rejects.

```javascript
const primero = await Promise.any([p1, p2, p3]);
```

---

## 🚨 Error Handling

```javascript
async function cargar() {
  try {
    const res = await fetch('/api/datos');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch (err) {
    console.error('Error:', err.message);
    return null;
  } finally {
    console.log('Terminado');
  }
}
```

!!! warning "Don't forget catch"
    If you don't catch promise errors, they become **unhandled rejections** and can crash the app. Always add `.catch()` or `try/catch`.

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-12">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which keyword marks a function as asynchronous?</p>
<button class="quiz-option" data-opt="a">A) await</button>
<button class="quiz-option" data-opt="b">B) async</button>
<button class="quiz-option" data-opt="c">C) promise</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>2.</strong> Which method waits for all promises to finish, even if some fail?</p>
<button class="quiz-option" data-opt="a">A) Promise.all</button>
<button class="quiz-option" data-opt="b">B) Promise.race</button>
<button class="quiz-option" data-opt="c">C) Promise.allSettled</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>3.</strong> What runs first: a promise or a setTimeout?</p>
<button class="quiz-option" data-opt="a">A) The promise (microtask)</button>
<button class="quiz-option" data-opt="b">B) The setTimeout (macrotask)</button>
<button class="quiz-option" data-opt="c">C) It depends on the browser</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="https://twitter.com/intent/tweet?text=Chapter%2012%3A%20Asynchronous%20JavaScript&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F12-javascript-asincrono%2F" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F12-javascript-asincrono%2F" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="https://wa.me/?text=Chapter%2012%3A%20Asynchronous%20JavaScript%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F12-javascript-asincrono%2F" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="https://libro.urukais.com/en/capitulos/12-javascript-asincrono/" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 13 — Módulos y bundlers](13-modulos-bundlers.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }