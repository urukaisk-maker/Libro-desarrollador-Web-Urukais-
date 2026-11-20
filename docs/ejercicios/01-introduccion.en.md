---
description: "Solved exercise 01: 01 — Introduction. Step-by-step annotated solution from the Web Developer's Book."
---
# 01 — Introduction

!!! quote "Solved exercise"
    First contact with HTML, CSS, and JavaScript. You're going to build your first interactive page.

---

## 🎯 Goal

Create an HTML page that displays:

1. A heading with your name.
2. A paragraph with a brief introduction.
3. A button that shows an `alert` with a greeting when clicked.

---

## 💡 Solution

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My first page</title>
</head>
<body>
  <h1>Hi, I'm Ana</h1>
  <p>I'm learning web development with the Web Developer's Book.</p>
  <button id="saludo">Greet</button>

  <script>
    document.getElementById('saludo').addEventListener('click', () => {
      alert('Hello from my first page! 👋');
    });
  </script>
</body>
</html>
```

---

## 🧠 Key Concepts

- `<!DOCTYPE html>`: tells the browser this is HTML5.
- `<h1>`: main heading (only one per page).
- `<button id="saludo">`: the `id` lets you select it from JS.
- `document.getElementById()`: selects an element by its id.
- `addEventListener('click', ...)`: listens for the click event.

---

## 🚀 Extra Challenges

- [ ] Add a second button that changes the heading color.
- [ ] Ask the user for their name with `prompt()` and greet them.
- [ ] Add an image with `<img>`.

---

[← Back to index](index.md){ .md-button }
[Go to exercise 02 →](02-html-basico.md){ .md-button .md-button--primary }