---
description: "Chapter 08 of the Web Developer's Book: 08 — Consuming APIs with fetch. Learn step by step with examples, exercises, and quizzes."
---
# 08 — Consuming APIs with fetch

!!! abstract "What you will learn"
    - What an API is and what it is used for.
    - How to make HTTP requests with fetch.
    - Handling JSON responses.
    - async/await and error handling.
    - Best practices when consuming APIs.

---

## 🔌 What is an API?

An **API** (*Application Programming Interface*) is a set of rules that allows two programs to communicate. In web development, it almost always refers to a **REST API** that returns data in **JSON** format.

!!! quote "An API is like a waiter"
    You (the client) order something from the menu (the request). The waiter (the API) goes to the kitchen (the server), picks up your order, and brings it to you (the response). You don't need to know how the kitchen works.

---

## 🌐 Anatomy of an HTTP 
```
GET https://api.ejemplo.com/usuarios?limit=10
Headers:
  Authorization: Bearer token123
  Content-Type: application/json
```

| Verb | Usage |
| :--- | :--- |
| `GET` | Fetch data |
| `POST` | Create a resource |
| `PUT` / `PATCH` | Update a resource |
| `DELETE` | Delete a resource |

| Status | Meaning |
| :--- | :--- |
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 📡 Basic fetch

```javascript
fetch('https://api.ejemplo.com/usuarios')
  .then(res => {
    if (!res.ok) throw new Error('HTTP Error ' + res.status);
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

!!! tip "fetch does not reject on HTTP errors"
    `fetch` only rejects the promise if there is a **network** error. If the server returns 404 or 500, the promise still resolves. That's why you must check `res.ok` manually.

---

## ⚡ async/await

The modern and more readable way:

```javascript
async function cargarUsuarios() {
  try {
    const res = await fetch('https://api.ejemplo.com/usuarios');
    if (!res.ok) throw new Error('HTTP Error ' + res.status);
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error('Something went wrong:', err);
  }
}

cargarUsuarios();
```

---

## 📤 Sending Data (POST)

```javascript
async function crearUsuario(usuario) {
  const res = await fetch('https://api.ejemplo.com/usuarios', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  });

  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

crearUsuario({ nombre: 'Ana', email: 'ana@ejemplo.com' })
  .then(data => console.log('Created:', data))
  .catch(err => console.error(err));
```

---

## 🔑 Token Authentication

```javascript
const res = await fetch('https://api.ejemplo.com/perfil', {
  headers: {
    'Authorization': 'Bearer ' + token,
  },
});
```

!!! warning "Never store tokens in source code"
    Tokens belong in environment variables or in `localStorage` (with care). **Never** in the source code you push to GitHub.

---

## 🔄 Parallel Requests

```javascript
const [usuarios, posts] = await Promise.all([
  fetch('/api/usuarios').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);
```

`Promise.all` waits for **all** promises to settle. If one fails, the whole thing fails.

```javascript
const resultados = await Promise.allSettled([
  fetch('/api/a').then(r => r.json()),
  fetch('/api/b').then(r => r.json()),
]);
// resultados[0].status === 'fulfilled' or 'rejected'
```

`Promise.allSettled` waits for all of them, but **does not fail** if any one rejects.

---

## 🚨 Error Handling

```javascript
async function cargarDatos() {
  try {
    const res = await fetch('/api/datos');
    if (!res.ok) {
      if (res.status === 401) throw new Error('Unauthorized');
      if (res.status === 404) throw new Error('Not found');
      throw new Error('HTTP Error ' + res.status);
    }
    return await res.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
```

---

## 🧠 Test Your Knowledge

<div class="quiz" data-quiz="capitulo-8">
<div class="quiz-question" data-answer="b">
<p><strong>1.</strong> Which HTTP verb is used to fetch data?</p>
<button class="quiz-option" data-opt="a">A) POST</button>
<button class="quiz-option" data-opt="b">B) GET</button>
<button class="quiz-option" data-opt="c">C) DELETE</button>
</div>
<div class="quiz-question" data-answer="a">
<p><strong>2.</strong> What must you check after a fetch to know if an HTTP error occurred?</p>
<button class="quiz-option" data-opt="a">A) res.ok</button>
<button class="quiz-option" data-opt="b">B) res.error</button>
<button class="quiz-option" data-opt="c">C) res.status === 0</button>
</div>
<div class="quiz-question" data-answer="c">
<p><strong>3.</strong> Which method waits for all promises to complete?</p>
<button class="quiz-option" data-opt="a">A) Promise.race</button>
<button class="quiz-option" data-opt="b">B) Promise.any</button>
<button class="quiz-option" data-opt="c">C) Promise.all</button>
</div>
</div>

---

## 📢 Share This Chapter

<div class="share-buttons">
<a class="share-btn share-btn--twitter" href="[https://twitter.com/intent/tweet?text=Chapter%208%3A%20Consuming%20APIs%20with%20fetch&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F08-apis%2F](https://twitter.com/intent/tweet?text=Chapter%208%3A%20Consuming%20APIs%20with%20fetch&url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F08-apis%2F)" target="_blank" rel="noopener">Twitter</a>
<a class="share-btn share-btn--linkedin" href="[https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F08-apis%2F](https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F08-apis%2F)" target="_blank" rel="noopener">LinkedIn</a>
<a class="share-btn share-btn--whatsapp" href="[https://wa.me/?text=Chapter%208%3A%20Consuming%20APIs%20with%20fetch%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F08-apis%2F](https://wa.me/?text=Chapter%208%3A%20Consuming%20APIs%20with%20fetch%20https%3A%2F%2Flibro.urukais.com%2Fen%2Fcapitulos%2F08-apis%2F)" target="_blank" rel="noopener">WhatsApp</a>
<button class="share-btn share-btn--copy" data-copy-url="[https://libro.urukais.com/en/capitulos/08-apis/](https://libro.urukais.com/en/capitulos/08-apis/)" aria-label="Copy link">Copy link</button>
</div>

---

## ➡ Next Step

[Go to Chapter 9 — Despliegue y hosting](09-despliegue.md){ .md-button .md-button--primary }
[Back to index](../index.md){ .md-button }